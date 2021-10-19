import React from 'react';
const SendMail = () => {
    return (
        <>
            <div class="form-container border border-dark">
                <form class="contact-form">
                    <div class="header">
                        <h5>New Message</h5>
                    </div>
                    <div class="form_body">
                        <input type="text" id="name" placeholder="Username" class="no-outline" /><br />
                        <input type="email" id="email" placeholder="To" class="no-outline" /><br />
                        <input type="text" id="subject" placeholder="Subject" class="no-outline" /><br />
                        <textarea id="message" placeholder="message" cols="30" rows="10" class="no-outline"></textarea>
                        <br />
                    </div>
                    <div class="sndbutton">
                        <input type="submit" class="submit btn btn-primary" value="Send" />
                    </div>
                </form>
            </div>
        </>
    )
}
export default SendMail;