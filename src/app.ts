import Router from './core/router';
import { IndexView, BibleView }from './page/index';
import BStore from './store';

const bStore = new BStore();
const router: Router = new Router();

const indexView = new IndexView('root');
const bibleView = new BibleView('root', bStore);

router.setDefaultPage(indexView);

router.addRoutePath('/index', indexView);
router.addRoutePath('/bible', bibleView);

router.route();
