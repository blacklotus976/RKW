import os
from datetime import datetime
from github import Github


def count_lines_in_file(file_path):
    with open(file_path, 'r', encoding='utf-8', errors='ignore') as file:
        return sum(1 for _ in file)


def count_lines_in_project(directory):
    total_lines = 0
    total_js_lines = 0
    total_txt_lines = 0
    total_files = 0
    total_js_files = 0
    total_txt_files = 0
    total_folders = 0
    max_depth = 0
    total_images = 0
    total_pdfs = 0

    print(f"Starting to walk through the directory: {directory}")

    for root, dirs, files in os.walk(directory):
        # Skip node_modules and nin directories
        dirs[:] = [d for d in dirs if d not in ['node_modules', 'nin']]

        depth = root[len(directory):].count(os.sep)
        max_depth = max(max_depth, depth)
        total_folders += 1
        print(f"Processing folder: {root}, Depth: {depth}")
        for file in files:
            file_path = os.path.join(root, file)
            if file.endswith('.js'):
                lines = count_lines_in_file(file_path)
                total_js_lines += lines
                total_js_files += 1
            elif file.endswith('.txt'):
                lines = count_lines_in_file(file_path)
                total_txt_lines += lines
                total_txt_files += 1
            elif file.endswith('.png') or file.endswith('.jpg'):
                total_images += 1
            elif file.endswith('.pdf'):
                total_pdfs += 1
            total_files += 1
            print(f"Processed file: {file_path}")

    total_lines = total_js_lines + total_txt_lines
    avg_density = total_lines / total_files if total_files else 0

    print(f"Finished walking through the directory: {directory}")

    return {
        'total_lines': total_lines,
        'total_js_lines': total_js_lines,
        'total_txt_lines': total_txt_lines,
        'total_files': total_files,
        'total_js_files': total_js_files,
        'total_txt_files': total_txt_files,
        'total_folders': total_folders,
        'max_depth': max_depth,
        'total_images': total_images,
        'total_pdfs': total_pdfs,
        'avg_density': avg_density
    }


def get_github_insights(repo_owner, repo_name, token):
    print(f"Fetching GitHub insights for {repo_owner}/{repo_name}")
    g = Github(token)
    repo = g.get_repo(f"{repo_owner}/{repo_name}")
    commits = repo.get_commits()
    contributors = repo.get_contributors()

    total_commits = commits.totalCount
    first_commit_date = commits.reversed[0].commit.author.date
    latest_commit_date = commits[0].commit.author.date
    branch_count = repo.get_branches().totalCount

    commits_per_contributor = {}
    for contributor in contributors:
        commits_per_contributor[contributor.login] = contributor.contributions

    print(f"Finished fetching GitHub insights for {repo_owner}/{repo_name}")

    return {
        "total_commits": total_commits,
        "first_commit_date": first_commit_date,
        "latest_commit_date": latest_commit_date,
        "branch_count": branch_count,
        "commits_per_contributor": commits_per_contributor
    }


def append_stats_to_file(stats, github_insights, file_path):
    with open(file_path, 'a', encoding='utf-8') as file:
        file.write("\n\nProject Statistics:\n")
        file.write(f"Total Lines (all .js and .txt files): {stats['total_lines']}\n")
        file.write(f"\tLines in .js files: {stats['total_js_lines']}\n")
        file.write(f"\tLines in .txt files: {stats['total_txt_lines']}\n")
        file.write(f"Total Files: {stats['total_files']}\n")
        file.write(f"\tTotal .js files: {stats['total_js_files']}\n")
        file.write(f"\tTotal .txt files: {stats['total_txt_files']}\n")
        file.write(f"Total Folders: {stats['total_folders']}\n")
        file.write(f"Max Depth: {stats['max_depth']}\n")
        file.write(f"Total Images (.png and .jpg): {stats['total_images']}\n")
        file.write(f"Total PDFs (.pdf): {stats['total_pdfs']}\n")
        file.write(f"Average Density: {stats['avg_density']:.2f}\n")
        file.write(f"Generated on: {datetime.now()}\n")

        file.write("\nGitHub Insights:\n")
        file.write(f"Total number of commits: {github_insights['total_commits']}\n")
        file.write(f"First commit date: {github_insights['first_commit_date']}\n")
        file.write(f"Latest commit date: {github_insights['latest_commit_date']}\n")
        file.write(f"Number of branches: {github_insights['branch_count']}\n")
        file.write("Commits per contributor:\n")
        for contributor, commits in github_insights["commits_per_contributor"].items():
            file.write(f"\tContributor: {contributor}, Commits: {commits}\n")


if __name__ == "__main__":
    project_directory = "C:/Users/james/source/rkw"
    print("Starting to count lines in the project")
    stats = count_lines_in_project(project_directory)
    print("Finished counting lines in the project")

    const_book_path = "C:/Users/james/source/rkw/public/const_book.txt"

    # GitHub repository details
    repo_owner = 'blacklotus976'  # Replace with the GitHub repository owner
    repo_name = 'RKW-front'  # Replace with the GitHub repository name
    token = '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'  # Replace with your GitHub personal access token

    print("Starting to fetch GitHub insights")
    github_insights = get_github_insights(repo_owner, repo_name, token)
    print("Finished fetching GitHub insights")

    print("Appending statistics and GitHub insights to const_book.txt")
    append_stats_to_file(stats, github_insights, const_book_path)
    print("Statistics and GitHub insights appended to const_book.txt")