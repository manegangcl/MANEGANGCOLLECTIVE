// this is me learning c#
// this is an app that lets you visually customise .nfo files for theming in fl studio

using System;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Windows.Forms;

namespace AutoNFO
{
    public partial class MainForm : Form
    {
        private bool nfoCreated = false;
        private string defaultNfoContent = "IconIndex=0\nHeightOfs=10\nVisible=true";
        private string selectedDirectory = "";
        private bool hiddenVar = true;
        private bool gradientVar = false;

        public MainForm()
        {
            this.Text = "auto-nfo v0.8 (c# port lol)";
            this.Size = new Size(600, 600);

            InitUI();
        }

        private void InitUI()
        {
            var menu = new MenuStrip();
            var helpMenu = new ToolStripMenuItem("Help");
            helpMenu.DropDownItems.Add("NFO Guide", null, OpenHelp);
            menu.Items.Add(helpMenu);
            this.Controls.Add(menu);

            var selectButton = new Button
            {
                Text = "Select Directory",
                Top = 30,
                Left = 10,
                Width = 120
            };
            selectButton.Click += SelectDirectory;
            this.Controls.Add(selectButton);

            var nfoLabel = new Label
            {
                Text = "NFO Content:",
                Top = 60,
                Left = 10
            };
            this.Controls.Add(nfoLabel);

            var nfoText = new TextBox
            {
                Top = 80,
                Left = 10,
                Width = 560,
                Height = 100,
                Multiline = true,
                Text = defaultNfoContent
            };
            this.Controls.Add(nfoText);

            var gradientLabel = new Label
            {
                Text = "Auto Fill Color Gradient:",
                Top = 190,
                Left = 10
            };
            this.Controls.Add(gradientLabel);

            var gradientCheckbox = new CheckBox
            {
                Text = "Enable",
                Top = 210,
                Left = 10,
                Checked = gradientVar
            };
            gradientCheckbox.CheckedChanged += (sender, e) => ToggleGradient(gradientCheckbox.Checked);
            this.Controls.Add(gradientCheckbox);

            var startColorLabel = new Label
            {
                Text = "Start Color:",
                Top = 240,
                Left = 10
            };
            this.Controls.Add(startColorLabel);

            var startColorTextBox = new TextBox
            {
                Top = 260,
                Left = 10,
                Width = 120,
                Text = "#484848",
                Enabled = false
            };
            this.Controls.Add(startColorTextBox);

            var endColorLabel = new Label
            {
                Text = "End Color:",
                Top = 290,
                Left = 10
            };
            this.Controls.Add(endColorLabel);

            var endColorTextBox = new TextBox
            {
                Top = 310,
                Left = 10,
                Width = 120,
                Text = "#FFFFFF",
                Enabled = false
            };
            this.Controls.Add(endColorTextBox);

            var confirmButton = new Button
            {
                Text = "Create NFO Files",
                Top = 340,
                Left = 10,
                Width = 150
            };
            confirmButton.Click += (sender, e) => CreateNfoFilesAction(nfoText.Text, startColorTextBox.Text, endColorTextBox.Text);
            this.Controls.Add(confirmButton);

            var statusLabel = new Label
            {
                Top = 370,
                Left = 10,
                Width = 560
            };
            this.Controls.Add(statusLabel);
        }

        private void ToggleGradient(bool enabled)
        {
            // NOTE;
            // enable color txt boxes based if gradient
            // assuming access to startColorTextBox and endColorTextBox
        }

        private void SelectDirectory(object sender, EventArgs e)
        {
            using (var folderDialog = new FolderBrowserDialog())
            {
                if (folderDialog.ShowDialog() == DialogResult.OK)
                {
                    selectedDirectory = folderDialog.SelectedPath;
                }
            }
        }

        private void CreateNfoFilesAction(string nfoContent, string startColor, string endColor)
        {
            if (nfoCreated)
            {
                MessageBox.Show("NFO files have already been created.");
                return;
            }

            startColor = FormatColor(startColor);
            endColor = FormatColor(endColor);

            CreateNfoFiles(selectedDirectory, nfoContent, hiddenVar, gradientVar, startColor, endColor);
        }

        private void CreateNfoFiles(string directoryPath, string nfoContent, bool hidden, bool gradientEnabled, string startColor, string endColor)
        {
            if (!Directory.Exists(directoryPath))
            {
                MessageBox.Show("Error: Invalid directory selected.");
                return;
            }

            try
            {
                var folders = Directory.GetDirectories(directoryPath).Select(Path.GetFileName).OrderBy(f => f).ToList();
                foreach (var folder in folders)
                {
                    var nfoFilePath = Path.Combine(directoryPath, folder + ".nfo");

                    if (gradientEnabled)
                    {
                        var color = GenerateGradientColor(folders.IndexOf(folder), folders.Count, startColor, endColor);
                        nfoContent = string.Format("Color={0}\n{1}", color, nfoContent);
                    }

                    File.WriteAllText(nfoFilePath, nfoContent);
                }

                MessageBox.Show("NFO files created successfully.");
                nfoCreated = true;
            }
            catch (Exception ex)
            {
                MessageBox.Show("Error: " + ex.Message);
            }
        }

        private string GenerateGradientColor(int index, int totalFolders, string startColor, string endColor)
        {
            int r = (int)((index / (float)totalFolders) * (Convert.ToInt32(endColor.Substring(1, 2), 16) - Convert.ToInt32(startColor.Substring(1, 2), 16)) + Convert.ToInt32(startColor.Substring(1, 2), 16));
            int g = (int)((index / (float)totalFolders) * (Convert.ToInt32(endColor.Substring(3, 2), 16) - Convert.ToInt32(startColor.Substring(3, 2), 16)) + Convert.ToInt32(startColor.Substring(3, 2), 16));
            int b = (int)((index / (float)totalFolders) * (Convert.ToInt32(endColor.Substring(5, 2), 16) - Convert.ToInt32(startColor.Substring(5, 2), 16)) + Convert.ToInt32(startColor.Substring(5, 2), 16));

            return string.Format("${0:X2}{1:X2}{2:X2}", b, g, r);
        }

        private string FormatColor(string color)
        {
            if (!color.StartsWith("#"))
            {
                color = "#" + color;
            }

            return string.Format("${0}{1}{2}", color.Substring(5, 2), color.Substring(3, 2), color.Substring(1, 2));
        }

        private void OpenHelp(object sender, EventArgs e)
        {
            string helpContent = @"NFO Guide:
Tip=string --- tip shown when folder is hovered in browser
ColIndex=int --- text colour in browser, FL standard colours are something like 0-9. Just try them out, you won't break anything
Color=$BBGGRR --- text colour in $BBGGRR hex, probably better to use this since you can use any colour
IconIndex=int --- Icon of folder, picked from SBItem.png in the skins folder. Fun fact, you can add icons to the end of the png and use them.
SortGroup=int --- This is so you can control the ordering of the folders, groups come before anything not in a group and higher group numbers come first
Visible=bool --- Visibility in the browser
HeightOfs=int --- height of the item in the browser
' highlight this subdir --- Supposedly highlights the directory? I've never noticed a difference.";

            MessageBox.Show(helpContent, "NFO Guide", MessageBoxButtons.OK, MessageBoxIcon.Information);
        }
    }
}