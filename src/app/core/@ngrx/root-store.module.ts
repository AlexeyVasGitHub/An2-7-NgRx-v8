import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreModule} from '@ngrx/store';
import { TasksStoreModule } from './tasks/tasks-store.module';
import { metaReducers } from './meta-reducers';
import { environment } from '../../../environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { routerReducers } from './router';
import { RouterState, StoreRouterConnectingModule } from '@ngrx/router-store';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot(routerReducers, {
      metaReducers,
      // All checks will automatically be disabled in production builds
      runtimeChecks: {
        strictStateImmutability: true, // default value is true
        strictActionImmutability: true, // default value is true
        // router state is not serializable
        // set false if you don't use CustomSerializer
        strictStateSerializability: true, // default value is false
        // router action is not serializable
        strictActionSerializability: false, // default value is false
        strictActionWithinNgZone: true, // default value is false
        strictActionTypeUniqueness: true // default value is false
      }
    }),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router',
      routerState: RouterState.Minimal
      // serializer: CustomSerializer // has a priority over routerState
    }),
    EffectsModule.forRoot([]),
    TasksStoreModule,
    // Instrumentation must be imported after importing StoreModule (config is optional)
    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ]
})
export class RootStoreModule {
}
