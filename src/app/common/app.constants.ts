import { environment } from 'src/environments/environment';
import { HttpHeaders } from '@angular/common/http';

export class AppConstants {
  private static API_BASE_URL = environment.apiBaseUrl;

  public static API_URL = AppConstants.API_BASE_URL + 'api/';

  public static httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
}
