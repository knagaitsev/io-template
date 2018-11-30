## IO Template: A Multiplayer Game Template

This template was made to give game devs a jump-start on building their multiplayer games! It runs on a Node.js server, and the client is built with webpack. Both the server and the client are live reloaded when you make changes, so you can develop faster.

The template has a simple demo which uses Phaser, an HTML5 game framework, and Colyseus, a multiplayer game server, but you are not bound to using these 3rd party libraries. You can view the demo here: http://io-template.herokuapp.com

### Getting Started

Start by cloning this repository:

```bash
git clone https://github.com/Loonride/io-template.git
cd io-template
```

Install all dependencies:

```bash
npm install
```

Start developing:

```bash
npm run dev
```

Then, navigate to `http://localhost:3000` in your browser. If you get an error, simply wait a few seconds and refresh the page, because webpack is still building.

### Deploying

On your server, do:

```bash
npm install
```

Then, do:

```bash
npm start
```

to run in production mode.

If you have questions, join the Loonride Discord: https://discord.gg/Sfbg2Sh