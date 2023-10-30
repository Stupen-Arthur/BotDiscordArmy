
// const { clientId, guildId, token, publicKey } = require('./config.json');
require('dotenv').config()
const APPLICATION_ID = process.env.APPLICATION_ID 
const TOKEN = process.env.TOKEN 
const PUBLIC_KEY = process.env.PUBLIC_KEY || 'not set'
const GUILD_ID = process.env.GUILD_ID 


const axios = require('axios')
const express = require('express');
const { InteractionType, InteractionResponseType, verifyKeyMiddleware } = require('discord-interactions');

const arthurDate = new Date('2024-10-31')
const baradzinDate = new Date('2024-10-27')
const kamaraDate = new Date('2024-10-30')
const kirillDate = new Date('2024-11-02')
const dzAndVitDate = new Date('2024-11-03')

const app = express();
// app.use(bodyParser.json());

const discord_api = axios.create({
  baseURL: 'https://discord.com/api/',
  timeout: 3000,
  headers: {
	"Access-Control-Allow-Origin": "*",
	"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
	"Access-Control-Allow-Headers": "Authorization",
	"Authorization": `Bot ${TOKEN}`
  }
});




app.post('/interactions', verifyKeyMiddleware(PUBLIC_KEY), async (req, res) => {
  const interaction = req.body;

  if (interaction.type === InteractionType.APPLICATION_COMMAND) {
    console.log(interaction.data.name)
	
    if(interaction.data.name == 'yo'){
      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: `Hello ${interaction.member.user.username}, Here's your army agenda!`,
		  files: ['img/povestka.jpeg'],
        },
      });
    }
	
	if(interaction.data.name == 'timetohome'){
      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: `Returning back after:
		  Borodzin ${Math.floor((baradzinDate - (new Date())) / (1000 * 60 * 60 * 24))}
		  Kamaara ${Math.floor((kamaraDate - (new Date())) / (1000 * 60 * 60 * 24))}
		  EdWard ${Math.floor((arthurDate - (new Date())) / (1000 * 60 * 60 * 24))}
		  Eeeee ${Math.floor((kirillDate - (new Date())) / (1000 * 60 * 60 * 24))}
		  上昇する太陽 ${Math.floor((dzAndVitDate - (new Date())) / (1000 * 60 * 60 * 24))}
		  𝓔𝓵 𝓜𝓲𝓷𝓲𝓼𝓽𝓻𝓮 ${Math.floor((dzAndVitDate - (new Date())) / (1000 * 60 * 60 * 24))}`,
        },
      });
    }
  }
});



app.get('/register_commands', async (req,res) =>{
  let slash_commands = [
    {
      "name": "yo",
      "description": "replies with Yo!",
      "options": []
    },
    {
      "name": "timetohome",
      "description": "this command shows when guys come back from the military",
      "options": []
    }
  ]
  try
  {
    // api docs - https://discord.com/developers/docs/interactions/application-commands#create-global-application-command
    let discord_response = await discord_api.put(
      `/applications/${APPLICATION_ID}/guilds/${GUILD_ID}/commands`,
      slash_commands
    )
    console.log(discord_response.data)
    return res.send('commands have been registered')
  }catch(e){
    console.error(e.code)
    console.error(e.response?.data)
    return res.send(`${e.code} error from discord`)
  }
})


app.get('/', async (req,res) =>{
  return res.send('Follow documentation ')
})


app.listen(8999, () => {

})

