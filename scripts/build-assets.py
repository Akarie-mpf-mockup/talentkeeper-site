#!/usr/bin/env python3
"""クリエイティブ素材（写真・ロゴ・動画）を Web 用に最適化して public/ へ出力する。

    python3 scripts/build-assets.py            画像・ロゴ・OG画像を生成
    python3 scripts/build-assets.py --video    動画の再エンコードも行う（ffmpeg 必須・数分かかる）

素材の場所は環境変数 TK_ASSETS で上書きできる。
生成物は public/ 配下にコミットするため、CI では本スクリプトを実行しない。
"""
import os, re, subprocess, sys
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

SRC = Path(os.environ.get(
    'TK_ASSETS',
    '/mnt/c/Users/Kenichi Takahashi/Desktop/クリエイティブ/タレントキーパー【TK】'))
ROOT = Path(__file__).resolve().parent.parent
OUT_IMG = ROOT / 'public/images'
OUT_LOGO = ROOT / 'public/images/logo'
OUT_OG = ROOT / 'public/images/og'
OUT_VIDEO = ROOT / 'public/video'
CONTENT = ROOT / 'content/voices'
FONT = '/root/project/.fonts/NotoSansCJKjp.otf'

NAVY = (11, 35, 81)
ORANGE = (254, 123, 1)
CREAM = (253, 245, 232)
WIDTHS = (1600, 1000, 600)

# 出力名 → 素材ファイル名（1枚1用途。NO_ が付くボツカットは使わない）
PHOTOS = {
    'hero-greeting':        '01_声かけ_引き.png',
    'story-1-smile':        '02a_新人アップ_作り笑顔.png',
    'story-2-smile-fades':  '02b_新人アップ_作り笑顔消える.png',
    'story-3-night':        '03_夜の寝室.png',
    'story-4-chat':         '05_チャットを打つ.png',
    'story-5-relief':       '06b_返信を読む_安堵.png',
    'story-6-morning':      '07_朝_主任とタブレット.png',
    'story-7-again':        '08_声かけ_再び_引き.png',
    'support-1-reply':      '06a_返信を読む_緊張.png',
    'support-2-night-office': '04_夜の無人事務所.png',
    'support-3-leader':     '00a_主任.png',
    'voices-newcomer':      '00b_新人.png',
}

# OG画像（1200x630）: ページ → 使用写真
OG_PHOTOS = {
    'home':                       'hero-greeting',
    'hub':                        'story-6-morning',
    'shinnyushain-kinmu-fuan':    'story-2-smile-fades',
    'ojt-kyoiku-zure':            'voices-newcomer',
    'kinmu-rule-fukohei':         'support-2-night-office',
    'ido-kibo-career':            'story-7-again',
    'work-life-balance-taishoku': 'story-3-night',
}
OG_HOME_TITLE = '入社後の定着を、継続的に支える。'

# name: (素材ファイル, ポスターに使う秒数)
VIDEOS = {
    'tk-admin-93s': ('TK【タレントキーパー】管理者向け_93s.mp4', 24),
    'tk-staff-43s': ('TK【スタッフサポート】従業員向け_43s.mp4', 12),
}


def log(msg):
    print(f'[assets] {msg}')


def photos():
    """写真を WebP 3サイズで書き出す。"""
    OUT_IMG.mkdir(parents=True, exist_ok=True)
    for name, src in PHOTOS.items():
        im = Image.open(SRC / src).convert('RGB')
        for w in WIDTHS:
            h = round(im.height * w / im.width)
            im.resize((w, h), Image.LANCZOS).save(
                OUT_IMG / f'{name}-{w}.webp', 'WEBP', quality=78, method=6)
        log(f'{name}: {" ".join(f"{w}w" for w in WIDTHS)}')


def trim(im, bg, tol=10):
    """周囲の背景色を切り落とす。"""
    px = im.convert('RGB').load()
    W, H = im.size

    def is_bg(x, y):
        r, g, b = px[x, y]
        return abs(r - bg[0]) <= tol and abs(g - bg[1]) <= tol and abs(b - bg[2]) <= tol

    top = next((y for y in range(H) if any(not is_bg(x, y) for x in range(0, W, 4))), 0)
    bottom = next((y for y in range(H - 1, -1, -1) if any(not is_bg(x, y) for x in range(0, W, 4))), H - 1)
    left = next((x for x in range(W) if any(not is_bg(x, y) for y in range(0, H, 4))), 0)
    right = next((x for x in range(W - 1, -1, -1) if any(not is_bg(x, y) for y in range(0, H, 4))), W - 1)
    return im.crop((left, top, right + 1, bottom + 1))


def flatten_cream(im, tol=14):
    """素材のわずかな地色ムラを、ナビ背景と同じ #fdf5e8 にそろえる。"""
    px = im.load()
    for y in range(im.height):
        for x in range(im.width):
            r, g, b = px[x, y]
            if abs(r - CREAM[0]) <= tol and abs(g - CREAM[1]) <= tol and abs(b - CREAM[2]) <= tol:
                px[x, y] = CREAM
    return im


def logos():
    """ロゴをトリミングして書き出す（背景はブランドのクリーム色のまま使う）。"""
    OUT_LOGO.mkdir(parents=True, exist_ok=True)

    lockup = flatten_cream(trim(Image.open(SRC / 'logo/tk_ロゴと文字.png').convert('RGB'), CREAM))
    pad = round(lockup.height * 0.12)
    canvas = Image.new('RGB', (lockup.width + pad * 2, lockup.height + pad * 2), CREAM)
    canvas.paste(lockup, (pad, pad))
    w = 900
    flatten_cream(canvas.resize((w, round(canvas.height * w / canvas.width)), Image.LANCZOS), tol=6)\
        .save(OUT_LOGO / 'tk-lockup.png', optimize=True)
    log(f'logo/tk-lockup.png ({w}px)')

    symbol = flatten_cream(trim(Image.open(SRC / 'logo/tk_ネイビーアーチとオレンジ扉のシンボル.png').convert('RGB'), CREAM))
    for size, fname in ((512, 'tk-symbol.png'), (180, 'apple-touch-icon.png'), (32, 'favicon-32.png')):
        pad = round(max(symbol.size) * 0.10)
        box = max(symbol.size) + pad * 2
        sq = Image.new('RGB', (box, box), CREAM)
        sq.paste(symbol, ((box - symbol.width) // 2, (box - symbol.height) // 2))
        sq.resize((size, size), Image.LANCZOS).save(OUT_LOGO / fname, optimize=True)
        log(f'logo/{fname} ({size}px)')

    # 記事や動画の余白に置く小さめのシンボル（透過なしで足りる用途のみ）
    tagline = flatten_cream(trim(Image.open(SRC / 'logo/tk_フルセット.png').convert('RGB'), CREAM))
    w = 900
    tagline.resize((w, round(tagline.height * w / tagline.width)), Image.LANCZOS)\
        .save(OUT_LOGO / 'tk-lockup-tagline.png', optimize=True)
    log('logo/tk-lockup-tagline.png（タグライン入り）')


def cover(im, size):
    """アスペクトを保って中央でトリミングし size に合わせる。"""
    tw, th = size
    scale = max(tw / im.width, th / im.height)
    im = im.resize((round(im.width * scale), round(im.height * scale)), Image.LANCZOS)
    left = (im.width - tw) // 2
    top = round((im.height - th) * 0.35)  # 顔が入りやすいよう少し上寄せ
    return im.crop((left, top, left + tw, top + th))


def wrap(draw, text, font, max_w):
    lines, cur = [], ''
    for ch in text:
        if ch == '\n':
            lines.append(cur); cur = ''
            continue
        if draw.textlength(cur + ch, font=font) > max_w and cur:
            lines.append(cur); cur = ch
        else:
            cur += ch
    if cur:
        lines.append(cur)
    return lines


def article_meta():
    """content/voices/*.md から slug と h1 を読む。"""
    meta = {}
    for md in sorted(CONTENT.glob('*.md')):
        raw = md.read_text(encoding='utf8')
        fm = raw.split('---')[1]
        get = lambda k: (re.search(rf'^{k}:\s*"?(.*?)"?\s*$', fm, re.M) or [None, ''])[1]
        slug = get('slug') or 'hub'
        meta[slug] = get('h1')
    return meta


def og_images():
    """1200x630 のOG画像を生成（写真＋ネイビーの覆い＋ロゴ＋見出し）。"""
    OUT_OG.mkdir(parents=True, exist_ok=True)
    titles = article_meta()
    titles['home'] = OG_HOME_TITLE
    symbol = Image.open(OUT_LOGO / 'tk-symbol.png').convert('RGB').resize((104, 104), Image.LANCZOS)
    f_title = ImageFont.truetype(FONT, 52)
    f_brand = ImageFont.truetype(FONT, 30)
    f_url = ImageFont.truetype(FONT, 24)

    for slug, photo in OG_PHOTOS.items():
        title = titles.get(slug, '')
        base = cover(Image.open(OUT_IMG / f'{photo}-1600.webp').convert('RGB'), (1200, 630))

        veil = Image.new('RGBA', (1200, 630))
        vd = ImageDraw.Draw(veil)
        for x in range(1200):
            a = int(238 - 150 * (x / 1200) ** 1.4)
            vd.line([(x, 0), (x, 630)], fill=NAVY + (a,))
        img = Image.alpha_composite(base.convert('RGBA'), veil).convert('RGB')

        d = ImageDraw.Draw(img)
        img.paste(symbol, (72, 64))
        d.text((196, 84), 'TalentKeeper', font=f_brand, fill=(255, 255, 255), stroke_width=1,
               stroke_fill=(255, 255, 255))
        d.text((196, 124), '採用の、その先へ。', font=f_url, fill=(255, 255, 255, 210))

        lines = wrap(d, title.replace('―', '—'), f_title, 900)[:4]
        y = 630 - 96 - len(lines) * 74
        for line in lines:
            d.text((72, y), line, font=f_title, fill=(255, 255, 255), stroke_width=1,
                   stroke_fill=(255, 255, 255))
            y += 74
        d.rectangle([72, y + 16, 132, y + 21], fill=ORANGE)
        d.text((72, y + 38), 'www.talentkeeper.jp', font=f_url, fill=(255, 255, 255))

        img.save(OUT_OG / f'{slug}.jpg', quality=86, optimize=True, progressive=True)
        log(f'og/{slug}.jpg')


def videos():
    """動画を再エンコードし、ポスター画像も書き出す。"""
    OUT_VIDEO.mkdir(parents=True, exist_ok=True)
    for name, (src, poster_at) in VIDEOS.items():
        dst = OUT_VIDEO / f'{name}.mp4'
        subprocess.run([
            'ffmpeg', '-y', '-i', str(SRC / src),
            '-vf', "scale='min(1280,iw)':-2",
            '-c:v', 'libx264', '-crf', '30', '-preset', 'slow', '-profile:v', 'high',
            '-pix_fmt', 'yuv420p', '-movflags', '+faststart',
            '-c:a', 'aac', '-b:a', '96k', str(dst),
        ], check=True, capture_output=True)
        subprocess.run([
            'ffmpeg', '-y', '-ss', str(poster_at), '-i', str(dst), '-frames:v', '1',
            '-vf', 'scale=1280:-2', str(OUT_VIDEO / f'{name}-poster.jpg'),
        ], check=True, capture_output=True)
        mb = dst.stat().st_size / 1024 / 1024
        log(f'video/{name}.mp4 ({mb:.1f}MB) + ポスター')


if __name__ == '__main__':
    if not SRC.exists():
        sys.exit(f'素材フォルダが見つかりません: {SRC}')
    photos()
    logos()
    og_images()
    if '--video' in sys.argv:
        videos()
    log('完了')
