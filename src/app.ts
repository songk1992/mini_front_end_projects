import Router from './core/router';
import { IndexView, BibleView }from './page/index';



const router: Router = new Router();

const indexView = new IndexView('root');
const bibleView = new BibleView('root');

router.setDefaultPage(indexView);

router.addRoutePath('/index', indexView);
router.addRoutePath('/bible', bibleView);

router.route();
