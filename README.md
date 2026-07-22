# Madix Systems Website

This folder is ready for GitHub Pages. It uses plain HTML, CSS, and JavaScript, so there is no build command and no paid website builder required.

## Connect the name and email form

1. Create a free form at https://formspree.io/.
2. Copy the endpoint Formspree gives you. It looks like `https://formspree.io/f/abcdwxyz`.
3. Open `script.js`.
4. Paste the endpoint into `FORM_ENDPOINT`:

```js
const FORM_ENDPOINT = "https://formspree.io/f/abcdwxyz";
```

The same endpoint receives:

- Free playbook requests
- Founding-member plan interest
- Former-client review submissions

The hidden `formType` field tells you which form was submitted. The visitor receives the playbook download only after a successful submission.

## Collect real client reviews

After publishing, add `#leave-review` to the end of your website address and send that complete link to former clients. Example:

```text
https://YOUR-USERNAME.github.io/madix-systems/#leave-review
```

The **Copy a link to this review form** button also creates that link automatically. Reviews are sent to Formspree for verification; they are not published automatically. Add only reviews from people you can verify and who selected the publication-permission checkbox.

### Make an approved review appear on the website

Open `testimonials.js` and add the verified review inside `window.MADIX_TESTIMONIALS`:

```js
window.MADIX_TESTIMONIALS = [
  {
    quote: "The client's exact approved words.",
    name: "Client Name",
    role: "Owner",
    company: "Business Name",
    result: "Optional verified improvement",
    rating: 5
  }
];
```

Each approved review automatically appears in the premium testimonial stage. Multiple reviews rotate every seven seconds and can also be browsed with arrow buttons.

## Publish with GitHub Pages

1. Create a new public GitHub repository named `madix-systems`.
2. Upload everything inside this folder to the repository root.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, select **Deploy from a branch**.
5. Choose `main` and `/root`, then save.
6. GitHub will display your public website URL after deployment.

## Change subscription prices

Edit the three `.plan` cards inside `index.html`. These buttons currently collect waitlist interest and do not charge visitors. Connect Stripe, Lemon Squeezy, Gumroad, PayMongo, or another provider only when you are ready to accept payments.

## Branding, experience, and claims

The moving strips use text names rather than copied official logos. The tools and documented results were drawn from May Ann A. Oloroso's supplied professional résumé. AT&T was included based on May's direct instruction. Keep only brands, tools, results, and skills you can truthfully support. The website states that no endorsement or current affiliation is implied.

Never create invented testimonials. The empty review card is intentional and should be replaced only after a former client submits an honest, approved review.

## Contact information

The site currently links to:

- `madixsystems@gmail.com`
- `https://www.facebook.com/madixsystem/`

## Metallic logo and brand film

- Header and footer logo: `assets/madix-logo-metallic.png`
- Full light logo: `assets/madix-logo-light.png`
- 36-second film: `assets/video/madix-system-story.mp4`
- Film poster: `assets/video/madix-system-story-poster.jpg`

The MP4 includes an original ambient soundtrack. The **Play film + narration** button starts the film after a user click and uses the visitor's browser voice for narration, because browsers block websites from starting surprise audio automatically.

## Platform and company icons

SVG icons live in `assets/icons`. Their names and logos identify tools or past work environments only; they do not imply endorsement, partnership, or current affiliation.
