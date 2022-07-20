import { Dimensions } from 'react-native';

const DESIGN_WIDTH = 375;
const DESIGN_HEIGHT = 812;

const { height, width } = Dimensions.get('screen');

const [shortDimension, longDimension] =
	width < height ? [width, height] : [height, width];
export const sw = (size: number) => {
	return (shortDimension / DESIGN_WIDTH) * size;
};

export const sh = (size: number) => {
	return (longDimension / DESIGN_HEIGHT) * size;
};
