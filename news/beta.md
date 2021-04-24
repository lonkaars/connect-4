[meta]: <title> (Connect 4 beta!)

This project will from now on be hosted here as a beta until the website has
enough features to 'go live'. There are a lot of known bugs that need fixing.
If you encounter any bugs that aren't listed here, please open a <a
href="https://github.com/lonkaars/connect-4/issues/new" target="_blank">new
GitHub issue</a>.

- Voerbak's (connect 4 engine) win checking algorithm is broken, this causes
  some games to finish when no one has won. If this happens to you, please open
  a new issue on GitHub and link the game id (the `?id=...` part in your adress
  bar).
- The settings page is empty. Non working settings are hidden, these include
  settings for custom themes, changing your username, email and password, and
  deleting your account.
- The buttons and timer aren't implemented (except for the resign/leave game
  button) in the bottom bar when playing a game.
- Editing the game rules isn't implemented.
- There aren't any mobile stylesheets. I (Loek) am still working on the mobile
  layouts in <a
  href="https://www.figma.com/file/rTciVQApAe6cwrH1Prl5Wn/4-op-een-rij?node-id=7%3A452"
  target="_blank">Figma</a>, when they're finished I'll start writing mobile
  stylesheets.
- The website's only in Dutch. I have no idea how to handle translations so the
  website will remain mostly in Dutch while I worry about implementing missing
  functionality.
- Games don't work when not logged in. This is because the game is bound to two
  user-id's instead of socket id's. This also means one user can't play two
  games at the same time.
- User presence and country don't fetch any data from the api on the `/user*`
  pages.
- The search feature is very janky. I'm currently still adding/removing columns
  from the database pretty often, but there are plans to move the sqlite3
  database to postgres, which has built in search functionality that doesn't
  suck (I hope).

I'm working as hard as I can on this website, but I have school exams coming up
so I don't think development will be very active the coming month.

