import os
import shutil
import subprocess

project_root = "/var/www"
project_name = "integralyatirim"
project_full = f"{project_root}/{project_name}"
copy_directory = f"/copy/{project_name}"
    
os.chdir(project_root)
if project_name in os.listdir():
  shutil.rmtree(project_name)

subprocess.run(f"cd {copy_directory} && npm install", shell=True, capture_output=True)
subprocess.run(f"mv {copy_directory} {project_full}", shell=True, capture_output=True)

subprocess.run(f"chmod -R a+rwx {project_full}", shell=True, capture_output=True)
subprocess.run(f"chmod -R a+rwx {project_full}/*", shell=True, capture_output=True)
subprocess.run(f"sudo chown -R www-data {project_full}", shell=True, capture_output=True)
subprocess.run(f"sudo chown -R www-data:www-data {project_full}", shell=True, capture_output=True)

content = f"""<VirtualHost *:80>
    ServerName integralgroupyatirim.com
    ServerAlias www.integralgroupyatirim.com

    ProxyPreserveHost On

    ProxyPass / http://localhost:15019/
    ProxyPassReverse / http://localhost:15019/

    ErrorLog ${{APACHE_LOG_DIR}}/{project_name}_error.log
    CustomLog ${{APACHE_LOG_DIR}}/{project_name}_access.log combined
</VirtualHost>
"""

with open(f"/etc/apache2/sites-available/{project_name}.conf", "w") as file:
    file.write(content)

subprocess.run(f"cd /etc/apache2/sites-available && sudo a2ensite {project_name}", shell=True, capture_output=True)
subprocess.run(f"sudo service apache2 restart", shell=True, capture_output=True)

existing_processes = subprocess.check_output(["pm2", "list"]).decode()
if project_name in existing_processes:
  subprocess.run(f"pm2 restart {project_name}", shell=True, capture_output=True)
else:
  subprocess.run(f"pm2 save --force", shell=True, capture_output=True)
  subprocess.run(f"cd {project_full} && pm2 start npm --name {project_name} -- run dev", shell=True, capture_output=True)
  subprocess.run(f"pm2 startup", shell=True, capture_output=True)
  subprocess.run(f"pm2 save --force", shell=True, capture_output=True)