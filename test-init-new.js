import { initHandler } from './dist/tools/init.js';

async function testInitNew() {
  try {
    const result = await initHandler({ projectRoot: '/tmp/test-project' });
    console.log('Init result for new project:', result);
  } catch (error) {
    console.error('Error:', error);
  }
}

testInitNew(); 