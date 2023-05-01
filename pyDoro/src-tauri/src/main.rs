// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(work: i32, short: i32, long: i32) -> String {
    format!("You will be working for {} minutes!\nAfter, you'll take 3 short ({} minute) breaks.\nFollowed by 1 long ({} minute) break!", work, short, long)
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
        .invoke_handler(tauri::generate_handler![greet])
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
