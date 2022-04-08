//TODO: learn rust
use std::sync::Mutex;
use tauri::State;

#[derive(Default)]
pub struct Projector {
  pub background: String,
  pub text: String,
  pub current_time: f32,
  pub play_pause: bool,
  pub logo: String,
}

impl Projector {
  pub fn set_background(&mut self, background: String) {
    self.background = background
  }
  pub fn get_background(&mut self) -> &String {
    &self.background
  }
  pub fn set_current_time(&mut self, time: f32) {
    self.current_time = time
  }
  pub fn get_current_time(&mut self) -> &f32 {
    &self.current_time
  }
  pub fn set_play_pause(&mut self, value: bool) {
    self.play_pause = value
  }
  pub fn get_play_pause(&mut self) -> &bool {
    &self.play_pause
  }
  pub fn set_text(&mut self, value: String) {
    self.text = value
  }
  pub fn get_text(&mut self) -> &String {
    &self.text
  }
  pub fn set_logo(&mut self, value: String) {
    self.logo = value
  }
  pub fn get_logo(&mut self) -> &str {
    &self.logo
  }
}
#[derive(Default)]
pub struct Presenter {
  projector: Projector,
}

//main application state
#[derive(Default)]
pub struct PresenterState(Mutex<Presenter>);

// command called when selecting an image from the Media Bin
#[tauri::command]
fn image_selected(file: String, clear: bool, state: State<PresenterState>) {
  let mut pres = state.0.lock().unwrap();
  pres.projector.set_background(file);
  pres.projector.set_play_pause(true);
  if clear {
    pres.projector.set_text("".into());
  }
  println!("Invoked by image_select: {}", pres.projector.background);
}

#[tauri::command]
fn get_image_selected(state: State<PresenterState>) -> String {
  let mut pres = state.0.lock().unwrap();
  let background = pres.projector.get_background();
  background.to_string()
}

#[tauri::command]
fn text_selected(text: String, state: State<PresenterState>) {
  let mut pres = state.0.lock().unwrap();
  pres.projector.set_text(text);
}

#[tauri::command]
fn get_text_selected(state: State<PresenterState>) -> String {
  let mut pres = state.0.lock().unwrap();
  let text = pres.projector.get_text();
  text.to_string()
}

#[tauri::command]
fn clear_to_logo(state: State<PresenterState>) -> String {
  // might need to have a settings.json file to set this
  let mut pres = state.0.lock().unwrap();
  let path = "C:\\path\\to\\clear_to_logo.png";
  pres.projector.set_text("".into());
  //TODO: figure out how to use pres.projector.get_logo()
  // rust compiler hates me
  pres.projector.set_background(path.to_string());
  path.to_string()
}

fn main() {
  tauri::Builder::default()
    .manage(PresenterState(Default::default()))
    .invoke_handler(tauri::generate_handler![
      image_selected,
      get_image_selected,
      text_selected,
      get_text_selected,
      clear_to_logo
    ])
    .run(tauri::generate_context!())
    .expect("failed to run app");
}
