package com.roysue.xposed1;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;


public class MainActivity extends AppCompatActivity {

    private Button button;

    @Override

    protected void onCreate(Bundle savedInstanceState) {

        super.onCreate(savedInstanceState);

        setContentView(R.layout.activity_main);

        button = (Button) findViewById(R.id.button);

        button.setOnClickListener(new View.OnClickListener() {

            public void onClick(View v) {

                Toast.makeText(MainActivity.this, toastMessage("我未被劫持"), Toast.LENGTH_SHORT).show();

            }

        });

    }

    public String toastMessage(String message) {

        return message;

    }

}