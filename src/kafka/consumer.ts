
import client from './client';


export async function consumer(){
  const consumer=client.consumer({groupId:'user-1'});

  await consumer.connect()
  await consumer.subscribe({ topics: ['rider-updated'],fromBeginning:true });

  await consumer.run({eachMessage:async ({topic,partition,message,heartbeat,pause})=>{
    console.log(topic,partition,message)
  }})
}

