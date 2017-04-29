# Rails Project Navigator for Visual Studio Code [![Build Status](https://travis-ci.org/brandoncc/rails-project-navigator.svg?branch=master)](https://travis-ci.org/brandoncc/rails-project-navigator)

The idea for this extension came from Tim Pope's excellent [rails.vim](https://github.com/tpope/vim-rails) vim plugin. While it doesn't do everything that rails.vim does, my goal was to start with implementing the basic Rails application navigation. 

## Features

* Quickly access files preset paths relative to your application
* Default categories which can be browsed are:
  * Config (*[workspace folder]/config*, excluding initializers)
  * Controllers (*[workspace folder]/app/controllers*)
  * Helpers (*[workspace folder]/app/helpers*)
  * Initializers (*[workspace folder]/config/initializers*)
  * Jobs (*[workspace folder]/app/jobs*)
  * Layouts (*[workspace folder]/app/views/layouts*)
  * Mailers (*[workspace folder]/app/mailers*)
  * Migrations (*[workspace fo]der]/db/migrate*)
  * Models (*[workspace folder]/app/models*)
  * Specs (*[workspace folder]/spec*)
  * Tests (*[workspace folder]/test*)
  * Views (*[workspace folder]/app/views*, excluding layouts)

![Navigating using the extension](https://github.com/brandoncc/rails-project-navigator/raw/master/images/navigating.gif)

## Usage

1. Run "Navigate Rails Project" from the command palette.
2. Choose a category of files to browse
3. Choose a file to open

You can also assign a keybinding to `railsProjectNavigator.navigate`, in place of #1.

## Extension Settings

Coming Soon!

## Known Issues

None yet

## TODO

* Add user configuration
* Allow users to disable categories completely
* Allow users to override default categories and their settings
* Allow users to add "global exclude" patterns which will cause files to be excluded for all categories
* Add "Rake Tasks" to default categories

## Release Notes

See the [change log](https://github.com/brandoncc/rails-project-navigator/blob/master/CHANGELOG.md)
