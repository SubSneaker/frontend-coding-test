# Notes for Lazuli's coding test - Tom Danino

In this page I will include any possible questions, considerations and information I think would be relevant.

## Considerations
- As I am developing this on Windows, I can't use Hiragino Kaku Gothic ProN, which is the font used in the figma. I am using a font-stack and it's likely falling back to Noto Sans JP.
- At first I was thinking to use styled-jsx library to implement css modules in  the same file as the React code. This is how Vue style SFCs work which I prefer and find more intuitive, however given it is not a common style for most React devs and to avoid confusion (Without specific plugins there isn't syntax highlighting), I decided to stick to TailwindCSS with Atomic CSS writing style for quick prototyping.
- The page view components are made to use server actions to optimize calls to the API and initialize the page with the data. subsequent calls use server actions to update the data.

## Possible Questions:

- In the figma and present info, it wasn't explained if the different panels represent different pages, so I am assuming a modal panel is opening. Otherwise, please confirm this for me. ANSWERED
- I assume the mock `msw` requires no changes on my end, but please confirm. ANSWERED
- I noticed there is a pnpm-lock.yaml, but I used regular npm to install the dependencies. Please confirm if I should use pnpm or not. ANSWERED
- This relates to something we discussed in the interview, but should I follow the figma design precisely (pixel perfect), or is it ok so long as it fits the look? ANSWERED
- Should I also handle responsive layout? There is no design spec for it in the figma so I'm going with mobile first best-effort for now. ANSWERED
- The example project comes with dark-theme support in the `globals.css` file. Should I adjust the UI for both light and dark themes? or assume light theme per figma? ANSWERED

## AI Usage
Regarding the use of AI, in the spirit of goodwill and disclosure I will explain how I used it and in what ways did it benefit me:

- I am coding using the AI-integrated IDE cursor, with the main model in use being Claude Sonnet 3.7
- AI is helping mostly with initial component generation and scaffolding, in order to not waste time manually typing out boilerplate code (for example, Provider/Context), and helps auto-complete and refactor things such as parameter names and type usage.
- The AI has not been instructed to create the page complete from scratch, only individual functions and components, following the explanations I set out for it explicitly
- It occasionally helped with refactoring code that was working already but was lacking some safeguards such as try carch clauses and fail cases.
- choice of development style, libraries use, and variables are made by me alone, and the AI just fleshes out with scaffolding.
- I also used it to quickly generate svg elements such as the arrow in the dropdown menu
- At the start of the project, I used it to quickly prototype different approaches (eg. using a table view VS a UL/LI with grid.).

## App usage:
- the app is run using the standard `npm run dev` command or built with `npm run build`
- the app hass two pages, `/` (main table display) and `/details` (detail view of a selected item)
- the app is not mobile optimized but can work on mobile devices of a varying size
- the app implements basic form validation and notification system.
