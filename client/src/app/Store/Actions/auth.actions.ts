import {createAction, props} from '@ngrx/store';
import {Auth} from '../../Models/Auth';


export const authenticateUser = createAction('[Login Component] Authenticate User', props<{payload: Auth}>());
export const logoutUser = createAction('[Navbar Component] Logout User');
