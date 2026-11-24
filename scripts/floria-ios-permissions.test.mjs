import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
test('iOS file picker has camera and library purpose strings',()=>{
 const plist=readFileSync(new URL('../ios/App/App/Info.plist',import.meta.url),'utf8');
 for(const key of ['NSCameraUsageDescription','NSPhotoLibraryUsageDescription']) assert.match(plist,new RegExp(`<key>${key}</key>\\s*<string>[^<]+</string>`));
});
