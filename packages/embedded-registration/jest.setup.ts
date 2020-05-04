import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
require('mutationobserver-shim');

global.MutationObserver = window.MutationObserver;
Enzyme.configure({ adapter: new Adapter() });
