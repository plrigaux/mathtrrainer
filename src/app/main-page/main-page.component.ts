import { Component, OnInit, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { WorksheetsMap, WorksheetsItem } from '../math-generator/worksheetsMap'
import { MathProblemTypes } from '../math-generator/mathProblemTypes';
import { ConfigService } from '../config.service'
import { Config } from '../config';
import { Subscription } from 'rxjs';
import { MatCheckbox } from '@angular/material/checkbox';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  exercises: WorksheetsItem[];
  private worksheetsItem: Map<string, WorksheetsItem> = new Map();
  private config: Config;
  private myEventSubscriptions: Subscription[] = [];
  @ViewChildren(MatCheckbox) checkboxes: QueryList<MatCheckbox>;

  constructor(private router: Router, private configService: ConfigService) {

  }

  ngOnInit(): void {
    this.exercises = WorksheetsMap.getWorksheetsItem();

    this.myEventSubscriptions.push(this.configService.subscribe(
      cfi => { this.config = cfi.config; }
    ));
    //TODO investigate
    /*this.configService.subscribe(
      cfi => { this.config = cfi.config; }
    )*/
  }

  ngOnDestroy(): void {
    this.myEventSubscriptions.forEach(subscription => subscription.unsubscribe());
    this.myEventSubscriptions = [];
    console.log("DEStroy !!!!!!!!!!!!");
  }

  goToProblems() {
    this.setUpConfig();
    this.router.navigate(['/problems']);
  }

  goToWorkout() {
    this.setUpConfig();
    this.router.navigate(['/workout']);
  }

  setUpConfig() {
    this.config.generators = new Map(this.worksheetsItem)
    /*if (this.worksheetsItem.size > 0) {
      this.config.mathProblemTypes = this.worksheetsItem.values().next().value;
    }*/
    this.configService.next(this.config, true)
  }

  getAdditions(): WorksheetsItem[] {
    console.log("getAdditions");
    return this.exercises;
  }

  filterAdditions(item: WorksheetsItem): boolean {
    return item.mathProblemType === MathProblemTypes.ADDITION
  }

  filterSubtraction(item: WorksheetsItem): boolean {
    return item.mathProblemType === MathProblemTypes.SUBTRACTION
  }

  checkboxChange(checked: boolean, item: WorksheetsItem) {
    console.log(checked);
    console.log(item);

    if (checked) {
      this.worksheetsItem.set(item.code, item);
    } else {
      this.worksheetsItem.delete(item.code);
    }
  }

  unCheckAll() {
    this.checkboxes.forEach(element => {
      element.checked = false
    });
  }
}
