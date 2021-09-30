import { NgForm } from "@angular/forms";
import { ComponentCanDeactivate } from "./ComponentCanDeactivate";
import { Directive } from "@angular/core";

export abstract class FormCanDeactivate extends ComponentCanDeactivate {
  abstract get form(): NgForm;

  canDeactivate(): boolean {
    return this.form.submitted || this.form.dirty;
  }
}
