

import client from './client';

export async function producer(){
    const producer=client.producer();
    await producer.connect();

   await  producer.send({topic:'rider-updated',messages:[{partition:0,key:'location_update',value:JSON.stringify({name:"johny",location:"SOUTH"})}]});
   await producer.disconnect();
}

