import HomeComponentPresenter from './home-presenter';
import SignInComponentPresenter from '../auth/sign-in/sign-in-presenter'
import FakeComponent from '../test/fake-component'
import ApiGateway from "../common/api-gateway";
import FakeStore from "../test/fake-store";
import StubGenerator from '../test/stub-generator'

let fakeStore = null;
let fakeSignInComponent = null;
let fakeHomeComponent = null;
let signInPresenter = null;
let homeComponentPresenter = null;

beforeEach(() => {
	fakeStore = new FakeStore();
	fakeSignInComponent = new FakeComponent(fakeStore);
	fakeHomeComponent = new FakeComponent(fakeStore);
	signInPresenter = new SignInComponentPresenter(fakeSignInComponent.dispatch);
	homeComponentPresenter = new HomeComponentPresenter(fakeHomeComponent.dispatch);
});

it('should load initial drawer menu', async () => {
	expect(fakeHomeComponent.props.homeViewModel).toEqual({signedIn:false});
});

it('should have logged in user message when successfully signed in', async () => {

	ApiGateway.prototype.save = StubGenerator.successfulLogin();

	await signInPresenter.signIn(fakeSignInComponent);

	expect(fakeHomeComponent.props.homeViewModel.signedIn).toBe(true);

});

it('should NOT have logged in user message when NOT successfully signed in', async () => {

	ApiGateway.prototype.save = StubGenerator.failedLogin();

	await signInPresenter.signIn(fakeSignInComponent);

	expect(fakeHomeComponent.props.homeViewModel.signedIn).toBe(false);

});






