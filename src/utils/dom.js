/* eslint-disable import/prefer-default-export */

import { tap, invoker } from 'ramda';


export const preventDefault = tap(invoker(0, 'preventDefault'));
