export const createTemplateEmail = (link: string): string => {
  return `
  <div>
   <style>
      .container {
         height: 100%;
         font-size: 18px;
         line-height: 20px;
         background-color: #212121 !important;
         margin: 0px;
         padding: 0px;
         width: 100% !important;
      }

      .x_container {
         display: block !important;
         max-width: 600px !important;
         clear: both !important;
         margin: 0 auto;
         padding: 0;
      }

      .x_header {
         max-width: 600px;
         display: block;
         margin: 30px auto 0;
         padding: 0
      }

      .x_content {
         background-color: #a3a3a3 !important;
         max-width: 545px;
         border-radius: 5px;
         display: block;
         margin: 0px auto;
         padding: 0px 0px 20px;
      }

      .text-h3 {
         color: #595959 !important;
         font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
         line-height: 1.4;
         font-weight: 700;
         font-size: 20px;
         margin: 30px 0px 12px;
         padding: 0px;
      }

      .x_keyline {
         border-top-width: 1px;
         border-top-color: rgba(0, 0, 0, 0.20);
         border-top-style: dotted;
         display: block;
         clear: both;
         margin: 0;
         padding: 10px 0;
      }

      .x_keyline_content {
         max-width: 465px;
         display: block;
         clear: both;
         margin: 0;
         padding: 10px 40px
      }

      .text-p {
         color: #595959 !important;
         font-size: 14px;
         font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
         font-weight: normal;
         line-height: 1.6;
         margin: 0px 0px 10px;
         padding: 0px;
      }

      .x_button {
         text-align: center;
         color: #fff;
         background-color: #4264fb;
         -webkit-border-radius: 12px;
         -moz-border-radius: 12px;
         border-radius: 12px;
         text-decoration: none;
         font-size: 14px;
         font-weight: bold;
         display: inline-block;
         width: auto;
         font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
         line-height: 1.6;
         margin: 20px auto;
         padding: 15px 30px;
      }

      .a_link {
         font-size: 11px;
         width: 100%;
         display: block;
         overflow-wrap: break-word;
         color: #4264fb !important;
         font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
         font-weight: normal;
         line-height: 1.6;
         text-decoration: none;
         margin: 10px 0px;
         padding: 0px;
      }

      .mp-0 {
         margin: 0;
         padding: 0
      }

      .w-100 {
         width: 100%;
      }
   </style>
   <div>
      <div class="container">
         <table width="100%" class="mp-0 w-100">
            <tbody>
               <tr class="mt-0">
                  <td class="mt-0"></td>
                  <td class="x_container">
                     <div class="x_header">
                        <table width="100%" class="mp-0 w-100">
                           <tbody>
                              <tr class="mt-0">
                                 <td class="mt-0">
                                    <img data-imagetype="External" src="https://i.ibb.co/P6NQTxF/logo.png" class="x_no-border"
                                       style="max-width:100%; text-decoration:none; margin:0 0 0 20px; padding:0; border:none"></a>
                                 </td>
                              </tr>
                           </tbody>
                        </table>
                     </div>
                  </td>
                  <td class="mt-0"></td>
               </tr>
            </tbody>
         </table>
         <table width="100%" class="mp-0 w-100">
            <tbody>
               <tr class="mt-0">
                  <td class="x_container">
                     <div class="x_content">
                        <table class="mp-0 w-100">
                           <tbody>
                              <tr class="mt-0">
                                 <td class="mt-0">
                                    <div style="overflow:hidden; max-width:465px; margin:0; padding:0 40px">
                                       <h3 class="text-h3">You're almost ready to get started!</h3>
                                       <p class="text-p">Click on the button below to verify</span> your email address
                                          and complete your <strong>brunobach.com</strong> account setup.</p>
                                       <p align="center" class="text-p">
                                          <a href="${link}" target="_blank" rel="noopener noreferrer" data-auth="NotApplicable"
                                             class="x_button" data-linkindex="1">Verify my email</a>
                                       </p>
                                       <p class="text-p">Verifying your email ensures that you can access and manage
                                          your account, and receive critical notifications.</p>
                                       <p class="text-p">If you did not create a <strong>brunobach.com</strong> account,
                                          no further action is needed.</p>
                                       <br class="mt-0">
                                       <p class="text-p" align="center"><strong>brunobach.com</strong></p>
                                       <br class="mt-0">
                                    </div>
                                    <div class="x_keyline_content">
                                       <div class="x_keyline">
                                          <div>
                                             <p class="text-p" align="center">Button not working? Copy and paste this
                                                URL into your browser: ${link}
                                                <a class="a_link" href="${link}" target="_blank">
                                                </a>
                                             </p>
                                          </div>
                                       </div>
                                    </div>
                                 </td>
                              </tr>
                           </tbody>
                        </table>
                     </div>
                  </td>
               </tr>
            </tbody>
         </table>
      </div>
   </div>
</div>  
`;
};
