import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import {
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import SignaturePad from 'signature_pad';

export const APP_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  templateUrl: './add-edit.component.html',
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
  ],
})
export class ProductAddEditComponent implements OnInit {
  id: any;
  form: FormGroup;
  errorMessage: any;

  signaturePad!: SignaturePad;
  @ViewChild('canvas') canvasEl!: ElementRef;
  signatureImg!: string;
  signatureNeeded!: boolean;

  constructor(
    public productService: ProductService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);
    if (this.id) {
      this.productService
        .find(this.id)
        .subscribe((x) => this.form.patchValue(x));
    }
  }
  ngAfterViewInit() {
    this.signaturePad = new SignaturePad(this.canvasEl.nativeElement);
  }

  createForm() {
    this.form = this.formBuilder.group({
      productName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      purchaseDate: ['', Validators.required],
      productCode: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ],
      ],
      quantity: ['', Validators.required],
      receiverEmail: ['', Validators.maxLength(20)],
      signatureNeeded: ['', Validators.required],
      signatureImg: [''],
    });
  }

  startDrawing(event: Event) {}

  moved(event: Event) {}

  clearPad() {
    this.signaturePad.clear();
  }

  savePad() {
    const base64Data = this.signaturePad.toDataURL();
    this.signatureImg = base64Data;
    this.signatureNeeded = this.signaturePad.isEmpty();
    if (!this.signatureNeeded) {
      this.signatureNeeded = false;
    }
  }

  onSubmit() {
    let response = this.id
      ? this.productService.update(this.id, this.form.value)
      : this.productService.create(this.form.value);

    response.subscribe(
      (data) => {
        console.log('Purchase Request Created / Updated Successfully!');
        this.router.navigateByUrl('products/list');
      },
      (err) => {
        this.errorMessage = err.error.message;
      }
    );
  }
}
