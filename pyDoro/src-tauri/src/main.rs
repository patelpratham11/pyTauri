
// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::fs::File;
use std::io::{Write, BufReader, BufRead, Error};

struct times{
  work: i32, 
  short: i32, 
  long: i32,
}
impl times{
  fn new( work: i32, short: i32, long: i32) -> times{
    times{work: work, short: short, long: long}
  }
}

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn getValues() -> String{
  let path = "/Users/patelpratham11/Documents/Productivity/Code/pyTauri/pyDoro/src-tauri/src/Data/Times.txt";
  let full_file = File::open(path).expect("Unable to open data file!");
  let reader = BufReader::new(full_file);

  let mut real_line = "60,5,10".to_string();
  for line in reader.lines() {
    match line{
      Ok(l) => real_line = l.clone(),
      Err(e) => println!("Error in reading times, Defaulting Values!"),
    }
  }

  return real_line

}

#[tauri::command]
fn takeValues(work: u32, short: u32, long: u32) {
  println!("Hello, I am here");
  let path = "/Users/patelpratham11/Documents/Productivity/Code/pyTauri/pyDoro/src-tauri/src/Data/Times.txt";
  let mut full_file = File::create(path).expect("Unable to open data file!");

  let concat = work.to_string() + "," + &short.to_string() + "," + &long.to_string(); 
  write!(full_file, "{}",concat);

  return ();
}

use tauri::{CustomMenuItem, Menu, MenuItem, Submenu};

fn main() {
    // here `"quit".to_string()` defines the menu item id, and the second parameter is the menu item label.
    let quit = CustomMenuItem::new("quit".to_string(), "Quit");
    let toggle = CustomMenuItem::new("toggle".to_string(), "Toggle");
    let stat_show = CustomMenuItem::new("stats".to_string(), "Show Stats");
    let file = Submenu::new("File", Menu::new().add_item(quit));
    let stats = Submenu::new("Information", Menu::new().add_item(toggle).add_item(stat_show));
    let menu = Menu::new()
    .add_native_item(MenuItem::Copy)
    .add_item(CustomMenuItem::new("hide", "Hide"))
    .add_submenu(file)
    .add_submenu(stats);

    tauri::Builder::default()
        .menu(menu)
        .invoke_handler(tauri::generate_handler![getValues, takeValues])
        .on_menu_event(|event| {
            match event.menu_item_id() {
              "quit" => {
                std::process::exit(0);
              }              
              "toggle" => {
                println!("trigged the toggle function");
              }
              _ => {}
            }
          })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
