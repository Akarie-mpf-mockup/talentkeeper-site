# Contact intent publication run

Date: 2026-10-04 JST
Baseline: 975eb0974608e43714634566bd3ec6c640d7a0bb (public GA4 release).
Authorization: user instructed proceeding with the proposed publication of the current website via the Vault workflow.

Changes: primary document-request CTA, secondary implementation-consultation CTA; requestType in Formspree payload and subject; distinct success messages; intent-specific entry anchors; hero, pricing, navigation and article CTAs; mobile assertion updated for the new copy. GA4 measurement ID and loader preserved; request_type distinguishes document_request and consultation for clicks and accepted leads.

Validation: npm run build, npm run lint and git diff --check passed. Full Chromium/WebKit Playwright suite: 36/36 passed with one worker. Includes mobile and desktop intent routing, failure/retry, article navigation, existing company cases, horizontal layout and GA4 privacy/accepted-lead distinction. Real form delivery and analytics transmission were mocked in tests.

Operating contract: staff email the service materials after a document request. Automatic download or attachment is not implemented. Staff must verify the current recipient material and follow the fulfillment procedure recorded in the Vault.

History: git log for code changes; older reviews in docs/reviews/. Detailed rationale, publication state, before/after copy and source-screen evidence are maintained in the canonical service website change-history folder in the Vault.

Publication: prepared from the current remote main in a separate worktree, preserving the original dirty working tree. Exact published commit, Actions result and live checks will be recorded in the Vault after deployment.

Unobserved: actual Formspree receipt, material fulfillment and GA4 administrative report settings. No real customer message or form submission was sent during verification.
