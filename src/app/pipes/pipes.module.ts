import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { FilterPipe } from "./filter.pipe";
import { KeysPipe } from "./keys.pipe";
import { SearchPipe } from "./search.pipe";

@NgModule({
  declarations: [FilterPipe, KeysPipe, SearchPipe],
  imports: [],
  exports: [FilterPipe, KeysPipe, SearchPipe],
})
export class PipesModule {}
