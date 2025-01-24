import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { UserService } from '../service/user.service';
import { ImageDragDropComponent } from '../image-drag-drop/image-drag-drop.component';
import { MatTableModule } from '@angular/material/table';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    HttpClientModule,
    UserService,
    ImageDragDropComponent,
    provideHttpClient(),
    MatTableModule, provideAnimationsAsync(),
  ],
};
