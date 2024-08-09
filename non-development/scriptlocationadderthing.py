import sys
from PyQt6.QtWidgets import QApplication, QMainWindow, QFileDialog, QVBoxLayout, QWidget, QLabel, QTextEdit, QPushButton, QMessageBox
from bs4 import BeautifulSoup

class HtmlModifierApp(QMainWindow):
    def __init__(self):
        super().__init__()

        self.setWindowTitle("html script tag adder (revised editon)")
        self.setGeometry(100, 100, 600, 400)

        # Central widget and layout
        self.central_widget = QWidget()
        self.setCentralWidget(self.central_widget)
        self.layout = QVBoxLayout()
        self.central_widget.setLayout(self.layout)

        # Input fields
        self.label = QLabel("enter the script tag to add:")
        self.layout.addWidget(self.label)

        self.script_input = QTextEdit()
        self.layout.addWidget(self.script_input)

        self.add_button = QPushButton("add script tag to html files")
        self.add_button.clicked.connect(self.add_script_tag)
        self.layout.addWidget(self.add_button)

        self.info_label = QLabel("select one or more html files:")
        self.layout.addWidget(self.info_label)

        self.select_files_button = QPushButton("select html files")
        self.select_files_button.clicked.connect(self.select_html_files)
        self.layout.addWidget(self.select_files_button)

        self.selected_files = []

    def select_html_files(self):
        files, _ = QFileDialog.getOpenFileNames(self, "select html files", "", "HTML files (*.html);;All files (*)")
        if files:
            self.selected_files = files
            QMessageBox.information(self, "selected files", f"selected {len(files)} file(s).")

    def add_script_tag(self):
        script_tag = self.script_input.toPlainText().strip()
        if not script_tag:
            QMessageBox.warning(self, "warning", "please enter a valid script tag.")
            return

        if not self.selected_files:
            QMessageBox.warning(self, "warning", "please select html files first.")
            return

        for file_path in self.selected_files:
            try:
                with open(file_path, 'r', encoding='utf-8') as file:
                    content = file.read()

                # Parse HTML
                soup = BeautifulSoup(content, 'html.parser')
                body_tag = soup.find('body')

                # Check if script tag already exists
                if body_tag and not soup.find('script', src=script_tag):
                    body_tag.append(BeautifulSoup(script_tag, 'lxml'))
                    with open(file_path, 'w', encoding='utf-8') as file:
                        file.write(str(soup))
                    QMessageBox.information(self, "success", f"script tag added to {file_path}")
                elif soup.find('script', src=script_tag):
                    QMessageBox.warning(self, "warning", f"script tag already exists in {file_path}")
                else:
                    QMessageBox.warning(self, "warning", f"no <body> tag found in {file_path}")
            except Exception as e:
                QMessageBox.critical(self, "error", f"failed to process {file_path}: {str(e)}")

if __name__ == "__main__":
    app = QApplication(sys.argv)
    window = HtmlModifierApp()
    window.show()
    sys.exit(app.exec())