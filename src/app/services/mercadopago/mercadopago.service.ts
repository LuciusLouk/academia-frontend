import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MercadopagoService {

  private apiUrl = 'http://localhost:8080/api/payment/create';

  private mp: any;

  constructor(private http: HttpClient) {
    this.loadMercadoPagoScript().then(() => {
      this.mp = new window.MercadoPago('APP_USR-a7d0baaa-6e85-4dfc-9886-6dcb3cd270fc');
    });
  }

  createPayment(title: string, description: string, price: number, quantity: number,userId:number,cursoId:number): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem("token")}`
      })
    };
    return this.http.post<any>(`${this.apiUrl}?title=${title}&description=${description}&price=${price}&quantity=${quantity}&userId=${userId}&courseId=${cursoId}`, {},httpOptions);
  }





  private loadMercadoPagoScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://sdk.mercadopago.com/js/v2';
      script.onload = () => {
        resolve();
      };
      script.onerror = () => {
        reject(new Error('Failed to load MercadoPago SDK'));
      };
      document.body.appendChild(script);
    });
  }

  createBrick(walletContainerId: string, preferenceId: string) {
    this.loadMercadoPagoScript().then(() => {
      const bricksBuilder = this.mp.bricks();
  
      bricksBuilder.create('wallet', walletContainerId, {
        initialization: {
          preferenceId: preferenceId,
        },
        customization: {
          texts: {
            valueProp: 'smart_option',
          },
        },
      });
    }).catch((error) => {
      console.error('Error loading MercadoPago SDK:', error);
    });
  }
  
}
