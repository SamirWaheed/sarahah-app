export const otpTemplate = (name,otp) => {
  return `
 <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>OTP Verification</title>
</head>
<body style="margin:0; padding:0; background-color:#0f172a; font-family: Arial, sans-serif;">
  
  <table width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td align="center">
        
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="background:#1e293b; margin:20px 0; border-radius:8px; overflow:hidden;">
          
          <!-- Header -->
          <tr>
            <td style="background:#111827; padding:20px; text-align:center; color:#f9fafb; font-size:24px; font-weight:bold;">
              Verify Your Account
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:30px; color:#e5e7eb; font-size:16px; line-height:1.6; text-align:center;">
              <p>Hi <strong style="color:#ffffff;">${name}</strong>,</p>

              <p>
                Use the following OTP code to complete your verification process.
              </p>

              <!-- OTP BOX -->
              <div style="margin:30px 0;">
                <span style="display:inline-block; background:#020617; padding:15px 25px; font-size:28px; letter-spacing:5px; color:#ffffff; border-radius:8px; font-weight:bold;">
                  ${otp}
                </span>
              </div>

              <p>
                This code will expire shortly. Do not share it with anyone.
              </p>

              <p>
                If you didn’t request this, you can safely ignore this email.
              </p>

              <p style="margin-top:30px;">Thanks,<br/>AL.M Egypt</p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#020617; padding:15px; text-align:center; font-size:12px; color:#9ca3af;">
              © 2026 Your Company. All rights reserved.
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>

};
`
}


