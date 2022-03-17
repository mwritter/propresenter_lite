use tauri::{Manager, Window};

// the payload type must implement `Serialize`.
#[derive(Clone, serde::Serialize)]
struct Payload {
  message: String,
}

// command called when selecting an image from the Media Bin
#[tauri::command]
fn image_selected(window: Window) {
  println!("Invoked by image_select");
  // window.emit("event_name", Payload { message: "event_name called from the backend".into() }).unwrap();
}

fn main() {
  tauri::Builder::default()
    .setup(|app| {
      // example code to work with events - this is how we'll communicate between the multiple windows
      // listen to the `event-name` (emitted on any window)
      // let id = app.listen_global("another_one", |event| {
      //   println!("got event-name with payload {:?}", event.payload());
      // });
      // unlisten to the event using the `id` returned on the `listen_global` function
      // an `once_global` API is also exposed on the `App` struct
      // app.unlisten(id);

      // emit the `event-name` event to all webview windows on the frontend
      // app.emit_all("another_one", Payload { message: "Tauri is awesome!".into() }).unwrap();
      Ok(())
    })
    .invoke_handler(tauri::generate_handler![image_selected])
    .run(tauri::generate_context!())
    .expect("failed to run app");
}
