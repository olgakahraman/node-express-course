const { writeFile } = require('fs');

console.log('At start!');

writeFile(
	'./temporary/fileB.txt',
	'Here is the first line 1\n',
	(err) => {
		if (err) {
			console.log('This error happened:', err);
		} else {
			console.log('Line 1 is written.');

			writeFile(
				'./temporary/fileB.txt',
				'Here is the second line 1\n',
				(err) => {
					if (err) {
						console.log('This error happen: ', err);
					} else {
						console.log('Line 2 is written');

						writeFile(
							'./temporary/fileB.txt',
							'This is line 3\n',
							(err) => {
								if (err) {
									console.log(
										'This is error happen: ',
										err
									);
								} else {
									console.log('Line 3 is written');
									console.log(
										'All lines written successfully!'
									);
								}
							}
						);
					}
				}
			);
		}
	}
);

console.log('At end!');
