# Use the official MySQL image from Docker Hub
FROM mysql:latest

# Set the environment variables for MySQL
ENV MYSQL_ROOT_PASSWORD=root_password
ENV MYSQL_DATABASE=gip
ENV MYSQL_USER=gip_user
ENV MYSQL_PASSWORD=gip_password

# Copy custom MySQL configuration file if needed
# COPY my.cnf /etc/mysql/conf.d/

# Expose the MySQL port
EXPOSE 3306

# Run the MySQL server
CMD ["mysqld"]