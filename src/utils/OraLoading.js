import ora from 'ora';

export default function OraLoading( action = 'getting', repo = '' ) {
	const l = ora( `${action} ${repo}` );
	return l.start();
}