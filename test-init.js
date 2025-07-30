import { initHandler } from './dist/tools/init.js';

async function testInit() {
  try {
    const result = await initHandler({ projectRoot: '/Users/song.yue/git/solo-flow-mcp' });
    console.log('Init result:', result);
  } catch (error) {
    console.error('Error:', error);
  }
}

testInit(); 