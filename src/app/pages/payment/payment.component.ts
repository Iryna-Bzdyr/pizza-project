import { Component, OnInit, Inject } from '@angular/core';
import { AosToken } from '../../aos';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  constructor(@Inject(AosToken) aos) {
    aos.init();
   }

  ngOnInit() {
  }

}
