import Router from './core/router';
import { IndexView }from './page/index';



const router: Router = new Router();
const indexView = new IndexView('root');

router.setDefaultPage(indexView);

router.addRoutePath('/index', indexView);

router.route();