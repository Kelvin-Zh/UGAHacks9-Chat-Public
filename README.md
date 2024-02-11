UGAHacks 9 Project - SuperFriends!

This is a public repository for our code as we cannot figure out a way to secure the API key.

Description:
SuperFriends is a AI based chat project that allows the user to talk to any heroes that are available, and it generates an image that is based off of whatever hero is selected.


This project is built using different tools from CloudFlare. Currently, it is hosted on CloudFlare Workers and it uses CloudFlare's AI gateway to communicate with multiple OpenAI AIs. The problems that we encountered during this project can be broken down into two things. The first problem is trying to understand CloudFlare. Originally, CloudFlare has a website feature we tried to use, but it took way too long to get updated for us so we decided to try something else. We found something online that says we can host our code on CloudFlare Workers, which we then got it working with that. Trying to connect all the CloudFlare stuff together took sometime but we got it figured out. Second problem is OpenAI having a rate limit for API calls, so when we are running multiple tests, we have to create a new account as adding a payment to increase rate limit just was not working.

Tools used:
OpenAI
CloudFlare

Collaborator (GitHub):
Peter Jiung (PixlePixle)
Brett Ruane (Brett-Ruane)
Max Maher (Dinca2)
Kelvin Zhang (Kelvin-Zh)