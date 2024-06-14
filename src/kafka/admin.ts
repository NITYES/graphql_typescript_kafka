import client from './client'

export async function adminsetup() {
  const admin = await client.admin();

  console.log('kafka connecti');

  await admin.connect();
  console.log('admin connection successfull');
  
  await admin.createTopics({
    topics: [
      {
        topic: 'rider-updated',
        numPartitions: 2,
      },
    ],
  });
  console.log('topic created');
    await admin.disconnect();

}

