package com.reactnativedemo;

import com.facebook.react.ReactActivity;
import com.imagepicker.permissions.OnImagePickerPermissionsCallback; // <- add this import
import com.facebook.react.modules.core.PermissionListener; // <- add this import
public class MainActivity extends ReactActivity implements OnImagePickerPermissionsCallback {
  private PermissionListener listener;
    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "ReactNativeDemo";
    }

     @Override
      public void setPermissionListener(PermissionListener listener)
      {
        this.listener = listener;
      }

      @Override
      public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults)
      {
        if (listener != null)
        {
          listener.onRequestPermissionsResult(requestCode, permissions, grantResults);
        }
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
      }




}
