import { CartBag } from '@app/components/CartBag/CartBag';
import { NavBar } from './NavBar/NavBar';
import { Login } from '@app/components/Login/Login';
import testIds from '@app/utils/test-ids';
import LinksComponent from './NavBar/HeaderLinks';

const Header = () => (
  <>
    <header
      className="h-header z-40 w-full bg-neutral-200"
      data-testid={testIds.LAYOUT.HEADER}
    >
      <div className="flex px-6 sm:px-10 h-header items-center justify-between">
        <h2 className="flex uppercase">
          <a href="/">Mr Wrong Guy</a>
        </h2>
        <div className="hidden lg:flex justify-center">
          <LinksComponent />
        </div>
        <div className="flex items-center gap-4">
          <div>
            <Login />
          </div>

          <div>
            <CartBag />
          </div>
          <div>
            <NavBar />
          </div>
        </div>
      </div>
    </header>
  </>
);

export default Header;
