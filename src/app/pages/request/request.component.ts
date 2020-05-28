import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, NgForm, Validators } from '@angular/forms';
import { Observable, empty, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { LocationService } from '../../services/location.service';
import { Locality } from 'src/app/models/locality-model';
import { Effector } from 'src/app/models/effector-model';
import { RequestForm } from 'src/app/models/requestForm-model';
import { SuppliesService } from 'src/app/services/suppplies.service';
import { RequestSuppliesService } from 'src/app/services/requestSupplies.service';

@Component({
  selector: 'app-request',
  providers: [RequestSuppliesService],
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {
  order: any;
  ordersData = [];
  EffectorCtrl = new FormControl();
  filteredEffectors: Observable<string[]>;
  effector: Effector[] = [];
  localityId: string;
  selectedLocality: string = '';
  allLocalitiesList: Locality[] = [];
  requestForm: RequestForm = new RequestForm();
  requestorForm: FormGroup;
  requestorFormThirdStep: FormGroup;
  shown: boolean;
  RequestSuppliesService: any;
  requestFormToSend: any;
  resultData: any;
  formControlsAreFilled = false;
  TusDatosPassed = false;
  InsumosPassed = false;
  SuppliesItems = { supplyId: "", quantity: 0 }

  getlocality(selectedLocality) {
    this.selectedLocality = selectedLocality;
    let theselectedLocality = selectedLocality;
    let filteredLocality = this.allLocalitiesList.filter(function (localidad) {
      return localidad.localidad == theselectedLocality;
    });
    if (filteredLocality[0] !== undefined) {
      this.localityId = filteredLocality[0]._id;
    }
    this.refreshEffectorList(this.localityId);
  }

  getAllLocalities(allLocalitiesList) {
    this.allLocalitiesList = allLocalitiesList;
  }

  constructor(private fb: FormBuilder, @Inject(LocationService) private service: LocationService, private json: SuppliesService, private addService: RequestSuppliesService) {
  }

  ngOnInit(): void {
    this.getSupplies();
    this.requestForm.items = [];
    this.requestorForm = this.fb.group({
      effectorName: new FormControl(''),
      PersonEmail: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")
      ]),
      PersonPhonePrefix: new FormControl('', [Validators.minLength(2), Validators.required, Validators.pattern("^[0-9]*$")]),
      PersonPhone: new FormControl('', [Validators.minLength(6), Validators.required, Validators.pattern("^[0-9]*$")]),
      PersonName: new FormControl('', [Validators.minLength(2), Validators.required]),
      PersonLastname: new FormControl('', [Validators.minLength(2), Validators.required]),
      PersonAddress: new FormControl('', [Validators.minLength(2), Validators.required]),
      PersonAddressNumber: new FormControl('', [Validators.min(1), Validators.required, Validators.pattern("^[0-9]*$")]),
      PersonCity: new FormControl('', [Validators.minLength(2), Validators.required]),
      PersonPostalCode: new FormControl('', [Validators.min(1), Validators.required, Validators.pattern("^[0-9]*$")]),
      PersonDepartment: new FormControl('', Validators.required),
      PersonProvince: new FormControl('', [Validators.minLength(2), Validators.required]),


    });
    this.requestorFormThirdStep = this.fb.group({
      SuppliesItemsQuantity: new FormControl('', [Validators.min(1), Validators.required, Validators.pattern("^[0-9]*$")])
    });

    this.EffectorCtrl.valueChanges.subscribe(event => {
      this.EffectorCtrl.setValue(event.toLowerCase(), { emitEvent: false });
    });
  }

  get personEmail() {
    return this.requestorForm.get('PersonEmail')
  }
  get personLastname() {
    return this.requestorForm.get('PersonLastname')
  }

  private _filterEffector(value: string): string[] {
    let searchedEffectorName = value.toLowerCase();
    console.log(value);
    return this.effector.map(x => x.name).filter(option => option.toLowerCase().includes(searchedEffectorName));
  }

  refreshEffectorList(thelocalityId) {
    thelocalityId = this.localityId;
    this.service.getEffectorList(Effector, thelocalityId).subscribe(efectores => {
      this.effector = efectores;
      this.filteredEffectors = this.EffectorCtrl.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filterEffector(value))
        );
    });
  }

  private getSupplies() {
    this.json.getAll().subscribe((res: any) => {
      this.ordersData = res;
    })
  }

  onOrderChange(order, event) {
    if (!event.target.checked) {
      let indexId = this.requestForm.items.map(function (e) { return e.supplyId; }).indexOf(order._id);
      this.requestForm.items.splice(indexId, 1);
      this.shown = false;
    }
    this.shown = true;
  }

  onQuantityChange(order, event) {
    this.SuppliesItems.quantity = parseInt(event.target.value);
    this.SuppliesItems.supplyId = order._id;
    this.requestForm.items.push(this.SuppliesItems);
  }

  addRequest(): void {

    let formToSend = {
      priority: 1,
      state: "Pending",
      healthCenterId: 0,
      items: {},
      person: {}
    }
    if (this.EffectorCtrl.value != undefined) {
      let selectedEffector = this.EffectorCtrl.value;
      function filterForMatchingName(array, name) {
        return array
          .filter(obj => obj.name === name);
      }

      let selectedEffectorId = filterForMatchingName(this.effector, selectedEffector.toUpperCase())[0]._id;
      console.log(selectedEffectorId);
      formToSend.healthCenterId = selectedEffectorId;
    }
    else {
      return;
    }
    let items = [];
    items.push(this.requestForm.items);
    formToSend.items = this.requestForm.items;

    let personObject = {
      name: this.requestorForm.get('PersonName').value,
      lastname: this.requestorForm.get('PersonLastname').value,
      email: this.requestorForm.get('PersonEmail').value,
      phone: {
        type: "Cellphone",
        prefix: this.requestorForm.get('PersonPhonePrefix').value,
        number: this.requestorForm.get('PersonPhone').value
      },
      address: {
        street: this.requestorForm.get('PersonAddress').value,
        number: parseInt(this.requestorForm.get('PersonAddressNumber').value),
        postalCode: parseInt(this.requestorForm.get('PersonPostalCode').value),
        location: this.requestorForm.get('PersonCity').value,
        departmento: this.requestorForm.get('PersonDepartment').value,
        province: this.requestorForm.get('PersonProvince').value
      }
    };

    formToSend.person = personObject;
    this.requestFormToSend = formToSend;
    console.log(this.requestFormToSend);
    console.log(this.requestorForm);
    /*
    for (let [key, value] of Object.entries(this.requestorForm.value)) {
      console.log(value);
      if (value != "") {
        this.formControlsAreFilled = true;
      }
    }
    */
    this.addService.createSuppliesRequest(this.requestFormToSend).subscribe((res) => {
      this.resultData = res;
      console.log(this.resultData);
      console.log(this.formControlsAreFilled);
    });;
  }

  public stepsChange(e: any) {
    if (e.selectedIndex == 3) {


      this.addRequest();
    }
    if (e.selectedIndex == 2 || e.selectedIndex == 3) {
      let valuesAccumulator = [];
      for (let [key, value] of Object.entries(this.requestorForm.value)) {
        console.dir(value);
        if (value == "") {
          valuesAccumulator.push(value);
        }
      }
      console.log(valuesAccumulator);
      if (valuesAccumulator.length == 1) {
        this.formControlsAreFilled = true;
      }
      this.TusDatosPassed = true;
    }
    if (e.selectedIndex == 3) {
      this.InsumosPassed = true;
    }

  }


  formSubmit() {
    this.addRequest();
  }
}