const getOtpHtml = ({ email, otp }) => {
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<meta name="x-apple-disable-message-reformatting" />
<title>Your Verification Code</title>
<style>
  html, body { margin: 0; padding: 0; background: #f4f4f7; }
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;
    background: #f4f4f7; color: #1a1a2e;
  }
  table { border-collapse: collapse; }
  img { border: 0; display: block; max-width: 100%; height: auto; }

  .wrapper { width: 100%; background: #f4f4f7; }
  .container {
    width: 580px; max-width: 580px;
    background: #ffffff;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 4px 24px rgba(0,0,0,0.06);
  }

  .header {
    background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
    padding: 36px 40px 32px;
    text-align: center;
  }
  .header-icon {
    width: 52px; height: 52px;
    background: rgba(255,255,255,0.12);
    border-radius: 14px;
    display: inline-block;
    margin-bottom: 14px;
    line-height: 52px;
    font-size: 26px;
  }
  .brand {
    display: block;
    color: #ffffff;
    font-weight: 700;
    font-size: 18px;
    letter-spacing: 0.5px;
    text-decoration: none;
    margin-bottom: 4px;
  }
  .header-tagline {
    color: rgba(255,255,255,0.55);
    font-size: 13px;
    margin: 0;
  }

  .body { padding: 40px; }
  .eyebrow {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 1.2px;
    text-transform: uppercase;
    color: #7c3aed;
    margin: 0 0 10px 0;
  }
  .title {
    margin: 0 0 8px 0;
    font-size: 24px;
    line-height: 1.25;
    color: #0f0c29;
    font-weight: 700;
  }
  .subtitle {
    margin: 0 0 28px 0;
    font-size: 14px;
    color: #6b7280;
    line-height: 1.6;
  }
  .subtitle strong { color: #374151; font-weight: 600; }

  .otp-box {
    background: #f8f7ff;
    border: 1.5px solid #ddd6fe;
    border-radius: 14px;
    padding: 24px 20px;
    text-align: center;
    margin: 0 0 28px 0;
  }
  .otp-label {
    display: block;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 1.2px;
    text-transform: uppercase;
    color: #7c3aed;
    margin-bottom: 10px;
  }
  .otp {
    display: inline-block;
    font-size: 42px;
    font-weight: 800;
    letter-spacing: 14px;
    color: #0f0c29;
    font-family: 'Courier New', Courier, monospace;
    padding-left: 14px;
  }
  .otp-meta {
    margin-top: 12px;
    font-size: 12px;
    color: #9ca3af;
  }

  .divider {
    height: 1px;
    background: #f3f4f6;
    margin: 28px 0;
  }

  .info-row {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    margin-bottom: 12px;
  }
  .info-icon {
    width: 20px; height: 20px;
    border-radius: 50%;
    flex-shrink: 0;
    margin-top: 1px;
    text-align: center;
    line-height: 20px;
    font-size: 11px;
  }
  .icon-warn { background: #fef3c7; color: #d97706; }
  .icon-info { background: #ede9fe; color: #7c3aed; }
  .info-text {
    font-size: 13px;
    color: #6b7280;
    line-height: 1.55;
    margin: 0;
  }

  .footer {
    background: #f9fafb;
    border-top: 1px solid #f3f4f6;
    padding: 20px 40px;
    text-align: center;
  }
  .footer p {
    margin: 0 0 6px 0;
    font-size: 12px;
    color: #9ca3af;
    line-height: 1.6;
  }
  .footer p:last-child { margin: 0; }

  @media only screen and (max-width: 620px) {
    .container { width: 100% !important; border-radius: 0 !important; }
    .body { padding: 28px 24px !important; }
    .footer { padding: 20px 24px !important; }
    .otp { font-size: 34px !important; letter-spacing: 10px !important; }
  }
</style>
</head>
<body>
<table role="presentation" class="wrapper" width="100%" border="0" cellspacing="0" cellpadding="0">
<tr>
<td align="center" style="padding: 32px 16px;">
<table role="presentation" class="container" border="0" cellspacing="0" cellpadding="0" width="580">

  <!-- Header -->
  <tr>
    <td class="header">
      <div class="header-icon">🔐</div>
      <span class="brand">Authentication App</span>
      <p class="header-tagline">Security verification</p>
    </td>
  </tr>

  <!-- Body -->
  <tr>
    <td class="body">
      <p class="eyebrow">One-time code</p>
      <h1 class="title">Here's your verification code</h1>
      <p class="subtitle">
        We received a sign-in request for <strong>${email}</strong>.
        Use the code below to continue.
      </p>

      <!-- OTP box -->
      <div class="otp-box">
        <span class="otp-label">Your code</span>
        <div class="otp">${otp}</div>
        <p class="otp-meta">Expires in 5 minutes</p>
      </div>

      <div class="divider"></div>

      <!-- Info rows -->
      <table role="presentation" border="0" cellspacing="0" cellpadding="0" width="100%">
        <tr>
          <td>
            <table role="presentation" border="0" cellspacing="0" cellpadding="0" width="100%" style="margin-bottom: 10px;">
              <tr>
                <td width="28" valign="top">
                  <div class="info-icon icon-warn">!</div>
                </td>
                <td>
                  <p class="info-text">Never share this code with anyone, including our support team.</p>
                </td>
              </tr>
            </table>
            <table role="presentation" border="0" cellspacing="0" cellpadding="0" width="100%">
              <tr>
                <td width="28" valign="top">
                  <div class="info-icon icon-info">i</div>
                </td>
                <td>
                  <p class="info-text">Didn't request this? You can safely ignore this email — your account is not at risk.</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </td>
  </tr>

  <!-- Footer -->
  <tr>
    <td class="footer">
      <p>© 2025 Authentication App. All rights reserved.</p>
      <p>This is an automated message — please do not reply.</p>
    </td>
  </tr>

</table>
</td>
</tr>
</table>
</body>
</html>`;
    return html;
};


const getVerifyEmailHtml = ({ email, token }) => {
    const appName = process.env.APP_NAME || "Authentication App";
    const baseUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    const verifyUrl = `${baseUrl.replace(/\/+$/, "")}/token/${encodeURIComponent(token)}`;

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<meta name="x-apple-disable-message-reformatting" />
<title>${appName} – Verify your account</title>
<style>
  html, body { margin: 0; padding: 0; background: #f4f4f7; }
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;
    background: #f4f4f7; color: #1a1a2e;
  }
  table { border-collapse: collapse; }
  img { border: 0; display: block; max-width: 100%; height: auto; }

  .wrapper { width: 100%; background: #f4f4f7; }
  .container {
    width: 580px; max-width: 580px;
    background: #ffffff;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 4px 24px rgba(0,0,0,0.06);
  }

  .header {
    background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
    padding: 36px 40px;
    text-align: center;
  }
  .header-icon {
    width: 56px; height: 56px;
    background: rgba(255,255,255,0.12);
    border-radius: 16px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 16px;
    font-size: 28px;
    line-height: 1;
  }
  .brand {
    display: block;
    color: #ffffff;
    font-weight: 700;
    font-size: 18px;
    text-decoration: none;
    margin-bottom: 4px;
  }
  .header-tagline {
    color: rgba(255,255,255,0.5);
    font-size: 13px;
    margin: 0;
  }

  .banner {
    background: linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%);
    padding: 28px 40px;
    text-align: center;
  }
  .banner-step {
    display: inline-block;
    background: rgba(255,255,255,0.18);
    color: rgba(255,255,255,0.9);
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
    padding: 4px 12px;
    border-radius: 20px;
    margin-bottom: 12px;
  }
  .banner-title {
    color: #ffffff;
    font-size: 22px;
    font-weight: 700;
    margin: 0 0 6px 0;
  }
  .banner-sub {
    color: rgba(255,255,255,0.7);
    font-size: 14px;
    margin: 0;
  }

  .body { padding: 40px; }

  .greeting {
    font-size: 16px;
    color: #374151;
    line-height: 1.6;
    margin: 0 0 24px 0;
  }
  .greeting strong { color: #0f0c29; }

  .steps-title {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 1.2px;
    text-transform: uppercase;
    color: #9ca3af;
    margin: 0 0 16px 0;
  }
  .steps { margin: 0 0 28px 0; }
  .step-row {
    display: flex; align-items: flex-start; gap: 14px; margin-bottom: 14px;
  }
  .step-num {
    width: 26px; height: 26px;
    background: #ede9fe;
    color: #7c3aed;
    border-radius: 50%;
    text-align: center;
    line-height: 26px;
    font-size: 12px;
    font-weight: 700;
    flex-shrink: 0;
  }
  .step-text {
    font-size: 14px;
    color: #6b7280;
    padding-top: 3px;
    line-height: 1.5;
  }

  .btn-wrap { margin: 0 0 24px 0; }
  .btn {
    display: inline-block;
    background: linear-gradient(135deg, #7c3aed, #4f46e5);
    color: #ffffff !important;
    text-decoration: none;
    padding: 15px 32px;
    border-radius: 10px;
    font-weight: 700;
    font-size: 15px;
    letter-spacing: 0.3px;
  }

  .link-box {
    background: #f9fafb;
    border: 1px solid #e5e7eb;
    border-radius: 10px;
    padding: 14px 16px;
    margin: 0 0 24px 0;
  }
  .link-box p {
    margin: 0 0 6px 0;
    font-size: 12px;
    color: #9ca3af;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    font-weight: 600;
  }
  .link-box a {
    font-size: 12px;
    color: #6d28d9;
    word-break: break-all;
    text-decoration: none;
  }

  .notice {
    background: #fffbeb;
    border: 1px solid #fde68a;
    border-radius: 10px;
    padding: 14px 16px;
    font-size: 13px;
    color: #92400e;
    line-height: 1.55;
  }

  .divider { height: 1px; background: #f3f4f6; margin: 28px 0; }

  .footer {
    background: #f9fafb;
    border-top: 1px solid #f3f4f6;
    padding: 20px 40px;
    text-align: center;
  }
  .footer p {
    margin: 0 0 5px 0;
    font-size: 12px;
    color: #9ca3af;
    line-height: 1.6;
  }
  .footer p:last-child { margin: 0; }

  @media only screen and (max-width: 620px) {
    .container { width: 100% !important; border-radius: 0 !important; }
    .body { padding: 28px 24px !important; }
    .banner { padding: 24px !important; }
    .footer { padding: 20px 24px !important; }
  }
</style>
</head>
<body>
<table role="presentation" class="wrapper" width="100%" border="0" cellspacing="0" cellpadding="0">
<tr>
<td align="center" style="padding: 32px 16px;">
<table role="presentation" class="container" border="0" cellspacing="0" cellpadding="0" width="580">

  <!-- Header / Brand bar -->
  <tr>
    <td class="header">
      <div class="header-icon">✉️</div>
      <span class="brand">${appName}</span>
      <p class="header-tagline">Account setup</p>
    </td>
  </tr>

  <!-- Color banner -->
  <tr>
    <td class="banner">
      <span class="banner-step">Step 1 of 1</span>
      <h1 class="banner-title">Confirm your email address</h1>
      <p class="banner-sub">${email}</p>
    </td>
  </tr>

  <!-- Body -->
  <tr>
    <td class="body">
      <p class="greeting">
        Welcome to <strong>${appName}</strong>! You're almost ready to go.
        Just click the button below to verify your email address and activate your account.
      </p>

      <!-- Steps -->
      <p class="steps-title">How it works</p>
      <div class="steps">
        <table role="presentation" border="0" cellspacing="0" cellpadding="0" width="100%">
          <tr>
            <td width="40" valign="top"><div class="step-num">1</div></td>
            <td><p class="step-text">Click the <strong>Verify account</strong> button below</p></td>
          </tr>
          <tr><td height="14" colspan="2"></td></tr>
          <tr>
            <td width="40" valign="top"><div class="step-num">2</div></td>
            <td><p class="step-text">You'll be taken to ${appName} to complete setup</p></td>
          </tr>
          <tr><td height="14" colspan="2"></td></tr>
          <tr>
            <td width="40" valign="top"><div class="step-num">3</div></td>
            <td><p class="step-text">Start using your account immediately</p></td>
          </tr>
        </table>
      </div>

      <!-- CTA button -->
      <table role="presentation" class="btn-wrap" border="0" cellspacing="0" cellpadding="0">
        <tr>
          <td>
            <a class="btn" href="${verifyUrl}" target="_blank" rel="noopener">Verify account &rarr;</a>
          </td>
        </tr>
      </table>

      <!-- Fallback link -->
      <div class="link-box">
        <p>Or copy this link into your browser</p>
        <a href="${verifyUrl}" target="_blank" rel="noopener">${verifyUrl}</a>
      </div>

      <!-- Notice -->
      <div class="notice">
        ⚠️ &nbsp;This link expires in <strong>24 hours</strong>.
        If you didn't create an account, you can safely ignore this email.
      </div>
    </td>
  </tr>

  <!-- Footer -->
  <tr>
    <td class="footer">
      <p>© ${new Date().getFullYear()} ${appName}. All rights reserved.</p>
      <p>This is an automated message — please do not reply.</p>
    </td>
  </tr>

</table>
</td>
</tr>
</table>
</body>
</html>`;
    return html;
};
module.exports= {
    getVerifyEmailHtml,
    getOtpHtml,

}