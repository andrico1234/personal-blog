import React from "react"

export function Email() {
  return (
    <div>
      <script src="https://f.convertkit.com/ckjs/ck.5.js"></script>

      <form
        action="https://app.convertkit.com/forms/2432247/subscriptions"
        className="seva-form formkit-form"
        method="post"
        data-sv-form="2432247"
        data-uid="d026ca3e3c"
        data-format="inline"
        data-version="5"
        data-options='{"settings":{"after_subscribe":{"action":"message","success_message":"Success! Now check your email to confirm your subscription.","redirect_url":""},"analytics":{"google":null,"facebook":null,"segment":null,"pinterest":null,"sparkloop":null,"googletagmanager":null},"modal":{"trigger":"timer","scroll_percentage":null,"timer":5,"devices":"all","show_once_every":15},"powered_by":{"show":false,"url":"https://convertkit.com?utm_campaign=poweredby&amp;utm_content=form&amp;utm_medium=referral&amp;utm_source=dynamic"},"recaptcha":{"enabled":false},"return_visitor":{"action":"show","custom_content":""},"slide_in":{"display_in":"bottom_right","trigger":"timer","scroll_percentage":null,"timer":5,"devices":"all","show_once_every":15},"sticky_bar":{"display_in":"top","trigger":"timer","scroll_percentage":null,"timer":5,"devices":"all","show_once_every":15}},"version":"5"}'
        min-width="400 500 600 700 800"
      >
        <div data-style="minimal">
          <ul
            className="formkit-alert formkit-alert-error"
            data-element="errors"
            data-group="alert"
          />
          <div
            data-element="fields"
            data-stacked="false"
            className="seva-fields formkit-fields"
          >
            <div className="formkit-field">
              <input
                className="formkit-input"
                name="email_address"
                aria-label="Email Address"
                placeholder="Email Address"
                required
                type="email"
                style={{
                  color: "rgb(51, 51, 51)",
                  borderRadius: "2px",
                  fontWeight: 400,
                }}
              />
            </div>
            <button
              data-element="submit"
              className="formkit-submit"
              style={{
                color: "#333",
                backgroundColor: "rgb(255, 255, 255)",
                fontWeight: 700,
              }}
            >
              <div className="formkit-spinner">
                <div></div>
                <div></div>
                <div></div>
              </div>
              <span>Subscribe</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
