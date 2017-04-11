#!/usr/bin/env node
const s3 = require('s3');

const client = s3.createClient({
	s3Options: {
		region: 'eu-west-1',
		sslEnabled: true,
	},
});

const uploader = client.uploadDir({
	localDir: 'public',
	deleteRemoved: true,
	s3Params: { 
		Bucket: 'korzh.io' 
	}, 
});

uploader.on('error', console.log);
uploader.on('end', console.log);
