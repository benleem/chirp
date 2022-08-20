# Chirp

![Demo image](https://drive.google.com/uc?export=view&id=1VJGDSw-7YCLAZULWlJX7WDh-bwEuQ3HL)

Chirp is a social media platform. Keep up with people from around the globe, or just post funny memes. Whatever your social media needs, Chirp is there! Start now by creating an account!

The full site can be found [here](https://goggle-earth.netlify.app/)

## About This Project

Technologies/Libraries used:

- React
- NextJs
- JavaScript
- JSX
- CSS Modules
- Firebase SDK
- Giphy Fetch SDK
- Framer Motion
- Next PWA
- Nookies

The purpose of this social media project was to learn a new framework, NextJs. Another reason was to expose myself to a big project so I could build common things you find on a lot of websites(auth, infinite scrolling, CRUD capability, etc). What really made me spark an interest in making a social media project, was that I originally wanted a place to share recipes and beers with friends. I worked on it for a while, scrapped it, and turned it into Chirp instead!

Even though I learned a lot from this project, some trouble did pop up along the way. Firstly, I had trouble making the authentication work the way I wanted it to. I decided to use Firebase Auth because I was already using their database. Getting client-side auth working with firebase was straightforward, but I didn't like the flashing that happened when unauthenticated users visited the protected routes. For this reason, I decided to do the authentication on the server side. I then had to set up a Firebase Admin SDK. After much research and experimentation, I decided to store the firebase id token in a cookie. Once the user visits a page, the getServerSideProps function attempts to verify the token in the cookie.

Another problem that I encountered was getting infinite scrolling to work properly. Originally I had outsourced the problem to a popular library. After testing the library I figured out that the component the library uses needs component to be attached to a scrollable element. The element that was containing my posts was not scrollable (I was using the scroll on the body to make it look like Twitter or Facebook) so I had to come up with another solution. The solution I came up with involved the intersection observer. I put an intersection observer on each post element, and a boolean determining if the current post id is the same as the id of the last item in the posts array. If we intersect with the last post, run your function to get the new batch and then update the posts array to include the new batch.

I have learned a lot from this project and have grown as a developer. I've also had plenty of road bumps along the way. Although I've had a love-hate relationship with this project I still want to add more. If time permits, I would love to integrate a proper search engine and also a favorites page!

## Getting Started

To get started you will need to clone this repository onto your machine (you will need **node** and **npm** installed to properly recreate this project). You will also need to have a firebase account with a regular and admin SDK to get access to the proper env variables.

After the project files have been installed on your machine, go to the project directory and run the command below. This will install the dependencies found in the package.json.

```bash
npm install
```

After running the above command and installing the dependencies you can run this command to start a development server on localhost:3000:

```bash
npm run dev
```

After this, you can now play around with this project and code on a local development server as you see fit.
